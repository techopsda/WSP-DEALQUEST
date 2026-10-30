'use client';
import { Loading } from '@/components/shared/Loading';
import { Bid, Game, Member, Team, TeamQuestionsWithAnswers, Tournament } from '@/types/database';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { usePresence } from '../../database/hooks/usePresence';
import { useRealtime } from '../../database/hooks/useRealtime';
import useIsInstructor from '../hooks/useInstructor';
import useLocalStorage from '../hooks/useLocalStorage';
import useTeam from '../hooks/useTeam';
import { LobbyRoom } from '../lobby/LobbyRoom';
import { ErrorBox } from '../shared/ErrorBox';
import { Accounting } from './accounting';
import { Analysis } from './analysis';
import { Auction } from './auction';
import { Introductions } from './introductions';
import { EquityInvestment } from './equityInvestment';
import { Financing } from './financing';
import { GameWrapper } from './GameWrapper';
import { GlobalEvent } from './globalEvent';
import { LocalEvent } from './localEvent';
import { Questions } from './questions';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { YearEnd } from './yearEnd';
import { AuctionCompany } from './auction/AuctionCompanyType';
import { GameEnd } from './gameEnd';
import { GamePaused } from './shared/GamePaused';
import { redirect, useRouter } from 'next/navigation';

interface GameScreenProps {
  serverTeams: Team[];
  serverGames: Game[];
  tournament: Tournament;
}

export const GameScreen: React.FC<GameScreenProps> = ({ serverGames, serverTeams, tournament }) => {
  const [teamId] = useLocalStorage('teamId', '');
  const { isLoading, team } = useTeam(teamId);

  const router = useRouter();

  const [teams, setTeams] = useState(serverTeams);
  const [members, setMembers] = useState<Member[]>();

  const [games, setGames] = useState(serverGames);

  const [initialBids, setInitialBids] = useState<Bid[]>();
  const [initialAuctions, setInitlalAuctions] = useState<AuctionCompany[]>();

  const [teamQuestions, setTeamQuestions] = useState<TeamQuestionsWithAnswers[]>([]);

  const isInstructor = useIsInstructor();

  const [presenceState, trackTeam] = usePresence(tournament?.createdById ?? '');

  const { supabase } = useSupabase<'public'>();

  const realtimeTeams = useRealtime<Team>(
    teams,
    `team_updates_${tournament.id}`,
    'public',
    'Team',
    (old: Team, newTeam: Team) => old.id === newTeam.id,
    `tournamentId=eq.${tournament.id}`
  );

  const realtimeGames = useRealtime<Game>(
    games,
    `game_updates_${tournament.id}`,
    'public',
    'Game',
    (old: Game, newGame: Game) => old.id === newGame.id,
    `tournamentId=eq.${tournament.id}`
  );

  const realtimeTeam = realtimeTeams?.find((t) => t.id === team?.id);

  const game = realtimeGames?.find((g) => g.id === realtimeTeam?.gameId);

  const teamQuestionsAreCurrent = teamQuestions?.every((teamQuestion) => teamQuestion?.Question?.year === game?.year);

  useEffect(() => {
    //fetch teamQuestions
    const questionPeriods = ['questionsPre', 'questions', 'questionsPost'];

    const getTeamQuestions = async () => {
      if (game) {
        const { data: teamQuestionData, error: teamQuestionDataError } = await supabase
          .from('TeamQuestion')
          .select('*, Question!inner(*, Answer!Answer_questionId_fkey(*))')
          .eq('teamId', teamId)
          .eq('Question.year', game?.year)
          .order('orderNumber', { ascending: true });

        setTeamQuestions(teamQuestionData ?? []);
        if (teamQuestionDataError) {
          return (
            <ErrorBox
              title={teamQuestionDataError.message}
              message="Use the button below in order to enter a new lobby"
            />
          );
        }
      }
    };
    if (
      questionPeriods.some((period) => game?.periodType === period) &&
      (teamQuestions?.length < 1 || !teamQuestionsAreCurrent)
    ) {
      getTeamQuestions();
    }
  }, [game?.periodType]);

  useEffect(() => {
    const getMembers = async () => {
      const { data: members } = await supabase
        .from('Member')
        .select()
        .in(
          'teamId',
          _.map(realtimeTeams, (team) => team.id)
        );

      setMembers(members ?? []);
    };

    getMembers();
  }, [realtimeTeams]);

  useEffect(() => {
    setTeams(serverTeams);
  }, [serverTeams]);

  useEffect(() => {
    setGames(serverGames);
  }, [serverGames]);

  useEffect(() => {
    if (teamId) {
      trackTeam({ teamId: teamId });
    }
  }, [teamId]);

  useEffect(() => {
    const auctionPeriods = ['auctionPre', 'auction', 'auctionPost', 'auctionPostSummary'];

    const fetchAuctionsAndBids = async () => {
      //fetching only auctions related to the game

      if (game) {
        const { data: auctionsData, error: auctionsError } = await supabase
          .from('Auction')
          .select('*,Company(*, Sector(*), Earnings(*))')
          .eq('gameId', game?.id)
          .eq('year', game?.year)
          .order('lot', { ascending: true });

        setInitlalAuctions(auctionsData ?? []);

        if (auctionsError)
          return (
            <ErrorBox title={auctionsError.message} message="Use the button below in order to enter a new lobby" />
          );

        if (
          !initialBids ||
          (game?.year === 0 && game?.periodType === 'auctionPre') ||
          (initialBids?.length > 0 && !auctionsData?.some((auction) => auction.id === initialBids?.[0]?.auctionId))
        ) {
          //fetching  bids realted to the auctions array
          const { data: bidsData, error: bidsError } = await supabase
            .from('Bid')
            .select('*')
            .in(
              'auctionId',
              auctionsData.map((auction) => auction.id)
            );

          setInitialBids((bidsData as Bid[]) ?? []);
          if (bidsError) {
            return <ErrorBox title={bidsError.message} message="Use the button below in order to enter a new lobby" />;
          }
        }
      }
    };

    if (auctionPeriods.some((period) => game?.periodType === period)) {
      fetchAuctionsAndBids();
    }
  }, [game?.period]);

  if (isLoading) {
    return <Loading />;
  }

  if (!team && !isInstructor) {
    return <ErrorBox title="Team not found" message="Use the button below in order to enter a new lobby" />;
  }

  if (!realtimeTeam && !isInstructor) {
    return <ErrorBox title="Realtime team not found" message="Use the button below in order to enter a new lobby" />;
  }

  if ((((!game || game.status === 'notStarted') && !isInstructor) || isInstructor) && members) {
    return <LobbyRoom tournament={tournament} teams={realtimeTeams} team={realtimeTeam} members={members} />;
  }

  if (!game || !team) {
    return <ErrorBox title="Missing team or game" message="Use the button below to enter a new lobby" />;
  }

  if (game?.status === 'ended' && game.periodType !== 'gameEnd') {
    localStorage.clear();
    redirect(`${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}`);
  }

  return (
    <GameWrapper game={game} teamId={teamId}>
      {!isInstructor && (
        <>
          {game.stage === 0 && <Introductions team={team} game={game} tournament={tournament} />}
          {game.stage === 1 && <EquityInvestment team={team} game={game} tournament={tournament} />}
          {game.stage === 2 && teamQuestions?.length > 0 && teamQuestionsAreCurrent && (
            <Questions
              game={game}
              team={realtimeTeam as Team}
              teamQuestionAnswers={teamQuestions}
              tournament={tournament}
            />
          )}
          {game.stage === 3 && <Analysis game={game} team={realtimeTeam as Team} tournament={tournament} />}
          {game.stage === 4 && realtimeTeam && (
            <Financing game={game} team={realtimeTeam as Team} tournament={tournament} />
          )}
          {game.stage === 5 && initialBids && members && initialAuctions && (
            <Auction
              initialAuctions={initialAuctions}
              initialBids={initialBids}
              team={team}
              teams={realtimeTeams.filter((team) => team.gameId === game.id)}
              game={game}
              tournament={tournament}
              members={members}
            />
          )}
          {game.stage === 6 && <LocalEvent game={game} team={realtimeTeam as Team} tournament={tournament} />}
          {game.stage === 7 && <GlobalEvent game={game} team={team} tournament={tournament} />}
          {game.stage === 8 && <Accounting game={game} team={realtimeTeam as Team} tournament={tournament} />}
          {game.stage === 9 && <YearEnd game={game} team={team} tournament={tournament} />}
          {game.stage === 10 && <GameEnd game={game} tournament={tournament} />}
          {game?.stagePausedTime && <GamePaused />}
        </>
      )}
    </GameWrapper>
  );
};
