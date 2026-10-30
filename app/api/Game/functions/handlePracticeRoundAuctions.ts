import { Auction } from '@/types/database';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import _ from 'lodash';
import { handleAuctionSold } from './handleAuctionSold';

export const handlePracticeRoundAuctions = async (
  supabase: SupabaseClient<Database, 'public'>,
  auctions: Auction[]
) => {
  console.log(auctions, 'auctions, handlePracticeRoundAuctions');
  const { data: newAuctions, error: updatingAuctionError } = await supabase
    .from('Auction')
    .update({ active: false, sold: true })
    .in(
      'id',
      _.map(auctions, (auction) => auction.id)
    )
    .select();

  for (const auction of newAuctions ?? []) {
    await handleAuctionSold(auction);
  }

  if (updatingAuctionError)
    throw new Error(
      `TEAM/functions/handlePracticeRoundAuctions, ERROR UPDATING AUCTION ON MOVE GAME TO NEXT AUCTION: ${updatingAuctionError.message}`
    );
};
