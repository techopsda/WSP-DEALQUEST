import { AuctionCompany } from './AuctionCompanyType';
import { Game } from '@/types/database';
import { useEffect, useState } from 'react';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { practiceRoundBidding } from './PracticeRoundBidding';

interface Props {
  companyOnAuctionNow: AuctionCompany | undefined;
  teamId: string;
  companyReserve: number;
  bidAmount: number;
  game: Game;
  lastBidTeamId: string;
  setTeamIsOut: (teamIsOut: boolean) => void;
  teamIsOut: boolean;
  maxBidAmount: number;
  currentAuctionOutOfTime: boolean;
  currentBidAmount: number;
}

export const TeamBiddingButtons: React.FC<Props> = ({
  companyOnAuctionNow,
  teamId,
  companyReserve,
  bidAmount,
  game,
  lastBidTeamId,
  setTeamIsOut,
  teamIsOut,
  maxBidAmount,
  currentAuctionOutOfTime,
  currentBidAmount
}) => {
  const { supabase } = useSupabase<'public'>();
  const [teamAuctionResources, setTeamAuctionResources] = useState<number>(0);

  //create bid
  const createBid = async () => {
    await supabase.from('Bid').insert({
      amount: bidAmount + currentBidAmount,
      auctionId: companyOnAuctionNow?.id ?? '',
      teamId: teamId,
      companyId: companyOnAuctionNow?.Company?.id ?? '',
      gameId: game.id
    });

    if (
      game.year == 0 &&
      bidAmount + currentBidAmount < maxBidAmount &&
      bidAmount + currentBidAmount <= companyReserve
    ) {
      const amountBiddedByTeam = bidAmount + currentBidAmount;
      await practiceRoundBidding(
        supabase,
        companyOnAuctionNow?.id as string,
        companyOnAuctionNow?.Company?.id as string,
        game.id,
        teamId,
        amountBiddedByTeam,
        currentBidAmount
      );
    }
  };

  //fetching teams cash balance
  useEffect(() => {
    const getTeamsResources = async () => {
      const { data } = await supabase
        .from('BalanceSheet')
        .select()
        .eq('teamId', teamId)
        .eq('year', game.year)
        .maybeSingle();

      const cashAsOfAuctionStageStart =
        (data?.quizFund ?? 0) + (data?.financingFund ?? 0) + (data?.roundFund ?? 0) + (data?.cash ?? 0);

      if (data) {
        setTeamAuctionResources(cashAsOfAuctionStageStart - (data?.auctionSpendings ?? 0));
      }
    };
    getTeamsResources();
  }, [companyOnAuctionNow]);

  const disabledBid = () => {
    if (teamIsOut) {
      return true;
    } else if (currentAuctionOutOfTime) {
      return true;
    } else if (teamId === lastBidTeamId) {
      return true;
    }

    return teamAuctionResources - (bidAmount + currentBidAmount) < 0;
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <button
        id="bidButton"
        className="p-6 text-2xl bg-success-dark font-semibold text-white text-left rounded-lg disabled:bg-gray-800 disabled:text-gray-600 flex items-center justify-between gap-6"
        onClick={createBid}
        disabled={disabledBid()}
      >
        {bidAmount < companyReserve ? (
          <>
            <span>Bid</span> <span>+${companyReserve}m</span>
          </>
        ) : (
          <>
            <span>Bid</span> <span>+${currentBidAmount}m</span>
          </>
        )}
      </button>
      <button
        id="outButton"
        className="p-6 text-2xl bg-error font-semibold text-white text-left rounded-lg disabled:bg-gray-800 disabled:text-gray-600 flex items-center justify-between"
        disabled={lastBidTeamId === teamId || teamIsOut || game.year === 0}
        onClick={() => setTeamIsOut(true)}
      >
        We're out
      </button>
    </div>
  );
};
