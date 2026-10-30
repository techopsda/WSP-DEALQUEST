'use client';

import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Game, Tournament } from '@/types/database';
import { TournamentWithDashboardRelations } from '@/types/TournamentWithDashboardRelations';
import { Disclosure } from '@headlessui/react';
import _ from 'lodash';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePresence } from '../../database/hooks/usePresence';
import { useRealtime } from '../../database/hooks/useRealtime';
import { LobbyLayout } from '../lobby/LobbyLayout';
import GamePanel from './GamePanel/GamePanel';
import InstructorDashboardFooter from './InstructorDashboardFooter/InstructorDashboardFooter';
import { Menu } from 'lucide-react';
import { InstructorDashboardSettings } from './InstructorDashboardSettings';
import { useRouter } from 'next/navigation';
import { Loading } from '../shared/Loading';
import axios from 'axios';
import { API_REQUEST_TIMEOUT_MS } from '@/lib/apiConfig';

interface InstructorDashboardProps {
  serverGames: Game[];
  tournament: Tournament;
}

const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ serverGames, tournament }) => {
  const { supabase, session } = useSupabase<'public'>();
  const router = useRouter();

  const [games, setGames] = useState(serverGames);
  const [dashboardData, setDashboardData] = useState<TournamentWithDashboardRelations | null>();
  const [isFinalYear, setIsFinalYear] = useState(tournament?.finalYear === games[0]?.year);
  const [isLoadingWhileClosing, setIsLoadingWhileClosing] = useState(false);
  const [errorEndingTournament, setErrorEndingTournament] = useState(false);

  const realtimeGames = useRealtime<Game>(
    games,
    `game_updates_${tournament.id}`,
    'public',
    'Game',
    (old: Game, newGame: Game) => old.id === newGame.id,
    `tournamentId=eq.${tournament.id}`
  );

  const [presenceState] = usePresence(session?.user?.id ?? '');

  const connectedTeams = _.map(
    _.flatten(Object.values((presenceState as unknown as { teamId: string }[]) ?? {})),
    'teamId'
  );

  const endTournament = async () => {
    setIsLoadingWhileClosing(true);
    setErrorEndingTournament(false);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/Tournament/handleEndTournament`,
        { tournamentId: tournament?.id },
        { timeout: API_REQUEST_TIMEOUT_MS }
      );
      router.push(`${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/tournament/create-game`);
    } catch (e) {
      setErrorEndingTournament(true);
      setIsLoadingWhileClosing(false);
    }
  };

  useEffect(() => {
    setGames(serverGames);
  }, [serverGames]);

  useEffect(() => {
    setIsFinalYear(tournament?.finalYear === games[0]?.year);
  }, [games]);

  useEffect(() => {
    const setCompaniesAndMembersToState = async () => {
      const { data: dashboardData }: { data: TournamentWithDashboardRelations | null; error: unknown } = await supabase
        .from('Tournament')
        .select('id, Team(*, Member(*), TeamCompany(*, Company(*)), BalanceSheet(*))')
        .eq('id', tournament.id)
        .eq(
          'Team.BalanceSheet.year',
          realtimeGames.every((game) => game.stage > 1) ? realtimeGames[0]?.year : realtimeGames[0]?.year - 1
        )
        .single();

      setDashboardData(dashboardData);
    };

    setCompaniesAndMembersToState();
  }, [realtimeGames]);

  const [expanded, setExpanded] = useState<number[]>([]);

  const handleExpandDisclosure = (index: number) => {
    if (expanded.includes(index)) {
      setExpanded([...expanded.filter((expandedIndex) => expandedIndex !== index)]);
    } else {
      setExpanded([...expanded, index]);
    }
  };

  if (!serverGames || serverGames?.length === 0) {
    return (
      <LobbyLayout
        includeLogo
        footer={
          <div className="flex justify-center">
            <Link href={`/tournament/${tournament?.lobbyCode}`} className="[ dqSecondaryButton ]">
              Go to the lobby
            </Link>
          </div>
        }
        children={
          <div className="flex items-center flex-col gap-3">
            <AlertCircle className="w-12 h-12 text-error-light" strokeWidth={1} />
            <h1 className="text-white font-heading leading-snug text-5xl whitespace-nowrap">
              There are no games running using this lobby code
            </h1>
            <p className="text-lg">Click the button below to go to the lobby</p>
          </div>
        }
      />
    );
  }

  const allGamesWaitingNextYear = realtimeGames.every((game) => game.status === 'waitingForNextYear');

  const allGamesInProgress = realtimeGames.every((game) => game.status === 'active' || game.status === 'finalYear');

  const allGamesEnded = realtimeGames.every((game) => game.status === 'ended');

  // Instructor menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {isLoadingWhileClosing && <Loading />}
      {!isLoadingWhileClosing && (
        <>
          <div className="flex justify-end">
            <button
              className="absolute top-6 right-6 p-3 border-2 border-alpha-light-800 rounded-full duration-150 | hover:border-white hover:text-white"
              onClick={() => setIsMenuOpen(true)}
              title="Instuctor options"
            >
              <Menu />
            </button>
          </div>

          <div className="flex flex-col items-center gap-24 w-full justify-center pb-48">
            <div className="flex flex-col items-center">
              <p className="font-light">{tournament?.instructorName ?? 'The Instructor'}'s Lobby</p>
              <h1 className="font-heading text-2xl font-semibold text-white">
                {realtimeGames[0]?.year === 0 ? 'Practice Year' : 'Year ' + realtimeGames[0]?.year}
              </h1>
            </div>
            {allGamesWaitingNextYear && (
              <div className="flex flex-col justify-center items-center gap-3 max-w-2xl">
                <span className="text-2xl font-bold text-white">All games waiting for next year</span>
                <p className="text-white text-center text-lg">
                  Before starting the next year see if there are any questions in the room and review the leaderboards
                  to congratulate or chastise the teams.
                </p>
              </div>
            )}
            {allGamesEnded && (
              <span className="text-xl font-bold text-white bg-error p-6 rounded-md">All games ended</span>
            )}
            {allGamesInProgress && realtimeGames[0]?.year === 6 && (
              <div className="py-4 px-8 border flex flex-col gap-4 items-center border-alpha-light rounded-md max-w-2xl">
                <span className="text-white">
                  This will be the <strong>final</strong> year
                </span>
              </div>
            )}
            <div className="w-full max-w-6xl">
              <Disclosure className="w-full flex justify-center" as="div" defaultOpen>
                <div className="w-full flex flex-col gap-12 text-black">
                  {_.orderBy(realtimeGames, (game) => game?.id).map((game, index) => {
                    const gameTeams = dashboardData?.Team?.filter((team) => team.gameId == game.id);
                    const connectedGameTeams = connectedTeams.filter((teamId) =>
                      gameTeams?.find((team) => team.id === teamId)
                    );

                    return (
                      <GamePanel
                        key={game.id}
                        expanded={expanded}
                        handleExpandDisclosure={handleExpandDisclosure}
                        index={index}
                        game={game}
                        teams={gameTeams ?? []}
                        connectedTeams={connectedGameTeams}
                        tournament={tournament}
                      />
                    );
                  })}
                </div>
              </Disclosure>
            </div>
            <InstructorDashboardFooter
              setIsFinalYear={setIsFinalYear}
              isFinalYear={isFinalYear}
              games={realtimeGames}
              tournament={tournament}
            />
          </div>
          <InstructorDashboardSettings
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            setIsFinalYear={setIsFinalYear}
            isFinalYear={isFinalYear}
            endTournament={endTournament}
            tournament={tournament}
            games={realtimeGames}
            errorEndingTournament={errorEndingTournament}
          />
        </>
      )}
    </>
  );
};

export default InstructorDashboard;
