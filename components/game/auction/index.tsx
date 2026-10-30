import { useGameDetails } from '@/components/hooks/useGameDetails';
import useLocalStorage from '@/components/hooks/useLocalStorage';
import { getBidStatus } from '@/lib/auction/getBidStatus';
import { getSortedCompanyAuctions } from '@/lib/auction/getSortedCompanyAuctions';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { bidStatus } from '@/types/BidStatusEnum';
import { Bid, BidsWithCompaniesAndTeam, Game, Member, Team, TeamCompany, Tournament } from '@/types/database';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useRealtime } from '../../../database/hooks/useRealtime';
import { AuctionCompanies } from '../auction/AuctionCompanies';
import { Bids } from '../auction/Bids';
import { RoundTextScreen } from '../RoundTextScreen';
import { RoundWrapper } from '../RoundWrapper';
import { FooterDial } from '../shared/FooterDial';
import { AuctionCompany } from './AuctionCompanyType';
import { AuctionCounter } from './AuctionCounter';
import { PostAuctionOverallSummary } from './PostAuctionOverallSummary';
import { PostAuctionSummary } from './PostAuctionTeamSummary';
import { Joyride as ReactJoyride } from 'react-joyride';
import { TooltipComponent } from '@/components/shared/TooltipComponent';
import { SoldIllustration } from './SoldIllustration';
import { NotSoldIllustration } from './NotSoldIllustration';
import { createBidAgainstBot } from './createBidAgainstBotFunction';
import { useSettings } from '@/submodules/supabase-functions/lib/settings/useSettings';
import { GameSettings } from '@/types/GameSettings';
import { getTooltips } from '@/lib/shared/getTooltips';

interface Props {
  tournament: Tournament;
  game: Game;
  team: Team;
  teams: Team[];
  initialBids: Bid[];
  initialAuctions: AuctionCompany[];
  members: Member[];
}

export const Auction: React.FC<Props> = ({ tournament, game, teams, team, initialAuctions, initialBids, members }) => {
  //getting game settings values
  const { getSettings } = useSettings<GameSettings>();
  const { practiceRoundMaxBid, bidAmount } = getSettings(['practiceRoundMaxBid', 'bidAmount']);

  const practiceYearMaxBid = practiceRoundMaxBid?.amount ?? 50;
  const bidToIncreaseBy = bidAmount?.amount ?? 10;

  const [teamId] = useLocalStorage('teamId', '');
  const [teamCompanies, setTeamCompanies] = useState<BidsWithCompaniesAndTeam[]>([]);
  const [alreadyOwnedCompanies, setAlreadyOwnedCompanies] = useState<TeamCompany[]>([]);

  const [teamIsOut, setTeamIsOut] = useState<boolean>(false);
  const [currentAuctionOutOfTime, setCurrentAuctionOutOfTime] = useState<boolean>(false);

  const { supabase } = useSupabase<'public'>();
  const { stageTimings } = useGameDetails();

  const [sidebarAnimationEnded, setSidebarAnimationEnded] = useState(false);

  const realtimeBids = useRealtime<Bid>(
    initialBids,
    `bid_updates_${game.id}`,
    'public',
    'Bid',
    () => true,
    `gameId=eq.${game.id}`
  );

  useEffect(() => {
    const getAlreadyOwnedCompanies = async () => {
      const { data: teamCompanies, error } = await supabase.from('TeamCompany').select().eq('teamId', team.id);
      if (error) {
        console.log('getAlreadyOwnedCompanies error: ', error.message);
      }
      setAlreadyOwnedCompanies(teamCompanies ?? []);
    };
    if (game.periodType === 'auction' || game.periodType === 'auctionPost') getAlreadyOwnedCompanies();
  }, [game.periodType]);

  //sort companies in ascending order by lot number
  const sortedCompanyAuctions = getSortedCompanyAuctions(game, initialAuctions, alreadyOwnedCompanies);
  const { sortedAuctionCompanies, companyOnAuctionNow } = sortedCompanyAuctions;

  //filter bid so only current auction's bids are shown
  const realtimeBidsFiltered = realtimeBids.filter((bid) => bid.auctionId === companyOnAuctionNow?.id);
  const status = getBidStatus(realtimeBidsFiltered, teamId, teamIsOut);

  const lastBidTeamId = realtimeBidsFiltered.at(-1)?.teamId;

  useEffect(() => {
    // fetching  wining bids for final summary screen
    const getwinningTeamCompaniesData = async () => {
      const winningBids = await Promise.all(
        initialAuctions.map(async (auction) => {
          const { data: teamCompanyData } = await supabase
            .from('Bid')
            .select('*,Team(id, name, Member(*)), Company(id, name), Auction(lot)')
            .eq('auctionId', auction.id)
            .order('amount', { ascending: false })
            .limit(1)
            .maybeSingle();
          return teamCompanyData;
        })
      );

      setTeamCompanies(winningBids);
    };

    getwinningTeamCompaniesData();
  }, [initialAuctions]);

  useEffect(() => {
    setTeamIsOut(false);
  }, [game.periodType]);

  const steps = getTooltips(game.periodType, game.year);

  return (
    <RoundWrapper
      tournament={tournament}
      game={game}
      team={team}
      header="Auction"
      stageCompleteCallback={async () => {
        if (game.periodType === 'auction') {
          if (game.year === 0)
            await createBidAgainstBot(
              supabase,
              game,
              practiceYearMaxBid,
              bidToIncreaseBy,
              companyOnAuctionNow?.Company?.reserve ?? 0
            );
        }
      }}
      justify={game.periodType === 'auctionSold' ? 'justify-center' : 'justify-start'}
      setSidebarAnimationEnded={setSidebarAnimationEnded}
      stageTimings={stageTimings}
      allowSkip={game?.periodType === 'auctionPost' || game?.periodType === 'auctionPostSummary'}
      showSidebar={
        game?.periodType === 'auctionPre' ||
        game?.periodType === 'auctionPostSummary' ||
        game?.periodType === 'auctionPost'
      }
      preFooter={(differenceToEnd, stageTimingsState) => (
        <>
          {game.periodType === 'auction' && (
            <AuctionCounter
              stageTimingsState={stageTimingsState}
              lastBidTeamId={lastBidTeamId}
              teamId={team.id}
              differenceToEnd={differenceToEnd}
              auctionTimeElapsed={setCurrentAuctionOutOfTime}
            />
          )}
        </>
      )}
      footerSlot={
        game.periodType === 'auction' && (
          <FooterDial
            content={status}
            label="Status:"
            borderColor={
              status === bidStatus.winning
                ? 'border-success-light'
                : status === bidStatus.outbid
                ? 'border-warning'
                : status === bidStatus.out
                ? 'border-error-light'
                : 'border-alpha-highlight'
            }
            textColor={
              status === bidStatus.winning
                ? 'text-success-light'
                : status === bidStatus.outbid
                ? 'text-warning'
                : status === bidStatus.out
                ? 'text-error-light'
                : 'text-alpha-light-800'
            }
          />
        )
      }
      footerText={
        game.periodType === 'auction'
          ? `Auction ${companyOnAuctionNow?.lot ?? 0}/${game.year === 0 ? 1 : initialAuctions?.length ?? 0}`
          : undefined
      }
    >
      {game.periodType === 'auctionPre' && (
        <div className="grow flex items-center">
          <RoundTextScreen title="Auction" isIntro>
            <p>During the auction each company will be sold in order of the listing.</p>
            <p>Each bid will reset the timer, or until everyone is out.</p>
          </RoundTextScreen>
        </div>
      )}
      {(game.periodType === 'auction' || game.periodType === 'auctionSold') && (
        <>
          <ReactJoyride
            run={game.year === 0 && sidebarAnimationEnded}
            steps={steps ?? []}
            tooltipComponent={TooltipComponent}

          />
          {game.periodType === 'auctionSold' && (
            <>
              <div className="fixed inset-0 bg-alpha-950/60 z-50"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center gap-12 z-50 overflow-y-scroll">
                {lastBidTeamId && <SoldIllustration />}
                {!lastBidTeamId && <NotSoldIllustration />}
              </div>
            </>
          )}

          <div className="grid grid-cols-7 w-full max-w-[1680px] gap-24 pb-24">
            <div className="col-span-3">
              <Bids
                game={game}
                realtimeBids={realtimeBidsFiltered}
                companyOnAuctionNow={companyOnAuctionNow}
                teams={teams}
                members={members}
                teamId={teamId}
                setTeamIsOut={setTeamIsOut}
                teamIsOut={teamIsOut}
                maxBidAmount={practiceYearMaxBid}
                currentAuctionOutOfTime={currentAuctionOutOfTime}
                currentBidAmount={bidToIncreaseBy}
              />
            </div>
            <div className="col-span-4">
              <AuctionCompanies
                companies={sortedAuctionCompanies}
                companyOnAuctionNow={companyOnAuctionNow}
                game={game}
                auctionPeriod={game?.periodType}
                alreadyOwnedCompanies={alreadyOwnedCompanies}
              />
            </div>
          </div>
        </>
      )}
      {game.periodType === 'auctionPostSummary' && <PostAuctionSummary teamId={teamId} teamCompanies={teamCompanies} />}
      {game.periodType === 'auctionPost' && (
        <>
          <ReactJoyride
            steps={steps ?? []}
            run={game.year === 0 && teamCompanies?.length > 0 && sidebarAnimationEnded}
            tooltipComponent={TooltipComponent}

          />
          <PostAuctionOverallSummary teamCompanies={teamCompanies} teamId={teamId} />
        </>
      )}
    </RoundWrapper>
  );
};
