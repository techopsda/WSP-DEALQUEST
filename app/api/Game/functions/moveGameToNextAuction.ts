import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Game } from '@/types/database';
import _ from 'lodash';
import { handleAuctionSold } from './handleAuctionSold';
import { handlePracticeRoundAuctions } from './handlePracticeRoundAuctions';

export const moveGameToNextAuction = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { data: auctionPeriods } = await supabase
    .from('Period')
    .select()
    .eq('gameId', game.id)
    .eq('year', game.year)
    .order('periodOrder', { ascending: true })
    .eq('type', 'auction');

  const currentAuctionLotIndex = auctionPeriods?.findIndex((period) => period.periodOrder === game.period - 1);

  if (currentAuctionLotIndex === -1 || currentAuctionLotIndex === undefined) {
    throw new Error(
      `GAME/handlePeriodMove/moveGameToNextAuction => year:${game.year} - ERROR GETTING CURRENT AUCTION LOT`
    );
  }

  const { data: auctions } = await supabase
    .from('Auction')
    .select()
    .eq('gameId', game.id)
    .eq('lot', currentAuctionLotIndex + 1)
    .eq('year', game.year);

  if (game.year === 0) {
    if (auctions && auctions?.length > 0) await handlePracticeRoundAuctions(supabase, auctions);
    else
      throw new Error(
        `GAME/handlePeriodMove/moveGameToNextAuction => year:${game.year} - ERROR GETTING AUCTIONS ON MOVE GAME TO NEXT AUCTION - PRACTICE YEAR`
      );
  } else if (auctions) {
    const auction = auctions[0];

    if (auction && auctions?.length === 1) {
      const { data: bids } = await supabase.from('Bid').select().eq('auctionId', auction.id);

      const { data: newAuction, error: updatingAuctionError } = await supabase
        .from('Auction')
        .update({ active: false, sold: bids && bids?.length > 0 ? true : false })
        .eq('id', auction.id)
        .select()
        .maybeSingle();

      if (updatingAuctionError)
        throw new Error(
          `GAME/handlePeriodMove/moveGameToNextAuction => year:${game.year} - ERROR UPDATING AUCTION ON MOVE GAME TO NEXT AUCTION:  ${updatingAuctionError.message}`
        );

      if (newAuction && newAuction?.sold) {
        await handleAuctionSold(newAuction);
      }
    } else {
      throw new Error(
        `GAME/handlePeriodMove/moveGameToNextAuction => year:${game.year} - ERROR GETTING AUCTION ON MOVE GAME TO NEXT AUCTION`
      );
    }
  }
};
