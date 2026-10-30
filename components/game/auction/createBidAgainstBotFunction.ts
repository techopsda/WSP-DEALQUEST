import { Bid, Game } from '@/types/database';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import _ from 'lodash';

export const createBidAgainstBot = async (
  supabase: SupabaseClient<Database, 'public'>,
  game: Game,
  maxBidAmount: number,
  currentBidAmount: number,
  reserve: number
) => {
  const { data: teamData, error: teamError } = await supabase.from('Team').select('*').eq('gameId', game.id);

  if (teamError) {
    console.log(teamError.message);
    return;
  }

  if (!teamData) {
    return;
  }

  const { data: teamCompanyData, error: companyError } = await supabase
    .from('TeamCompany')
    .select('*,Company(Auction(*, Bid(*)))')
    .eq('Company.Auction.gameId', game.id)
    .in(
      'teamId',
      teamData.map((team) => team.id)
    );

  if (companyError) {
    console.log('ERROR GETTING CURRENT AUCTION: ', companyError.message);
    return;
  }

  const bidsToInsert: Pick<Bid, 'gameId' | 'auctionId' | 'companyId' | 'teamId' | 'amount'>[] = [];

  for (const team of teamData) {
    const currentTeamId = team.id;
    const botId = teamData.find((t) => t.id !== currentTeamId)?.id as string;

    const filteredTeamCompany = teamCompanyData?.find((teamCompany) => teamCompany.teamId === team.id);
    const auctions = filteredTeamCompany?.Company?.Auction;

    if (auctions) {
      for (const auction of auctions) {
        const bidsArray = auction?.Bid;
        const orderedBids = _.orderBy(bidsArray, (bid) => bid?.amount, 'desc');
        const lastBidAmount = orderedBids[0]?.amount ?? 0 ?? 0;

        if (lastBidAmount <= 0) {
          bidsToInsert.push({
            gameId: auction?.gameId as string,
            auctionId: auction.id as string,
            companyId: auction?.companyId as string,
            teamId: team.id,
            amount: reserve
          });
        }
        const orderedBidsToInsert = _.orderBy(
          bidsToInsert?.filter((bid) => bid?.auctionId === auction?.id),
          (bid) => bid?.amount,
          'desc'
        );
        const baseBid = lastBidAmount <= 0 ? reserve : lastBidAmount;
        if (lastBidAmount < maxBidAmount) {
          const difference = maxBidAmount - baseBid;
          const timesToLoop = Math.floor(difference / currentBidAmount);
          let bidder = orderedBidsToInsert[0]?.teamId === currentTeamId ? botId : currentTeamId;

          for (let i = 1; i <= timesToLoop; i++) {
            const bidAmount = baseBid + currentBidAmount * i;

            const newBid: Pick<Bid, 'gameId' | 'auctionId' | 'companyId' | 'teamId' | 'amount'> = {
              gameId: auction?.gameId as string,
              auctionId: auction?.id as string,
              companyId: auction?.companyId as string,
              teamId: bidder,
              amount: bidAmount
            };

            bidsToInsert.push(newBid);
          }
        }
      }
    }
  }

  if (bidsToInsert.length > 0) {
    const { error: insertError } = await supabase.from('Bid').insert(bidsToInsert);
    if (insertError) {
      console.log(`Could not insert bids array: ${insertError.message}`);
      return;
    }
  }
};
