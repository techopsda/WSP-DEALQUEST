import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const practiceRoundBidding = async (
  supabase: SupabaseClient<Database, 'public'>,
  auctionId: string,
  companyId: string,
  gameId: string,
  teamId: string,
  amountBid: number,
  currentBidAmount: number
) => {
  const { data: firstBidTeamData } = await supabase
    .from('Team')
    .select('id')
    .eq('gameId', gameId)
    .neq('id', teamId)
    .limit(1)
    .maybeSingle();
  const { data: team, error: errorTeam } = await supabase
    .from('Bid')
    .select('teamId')
    .eq('auctionId', auctionId)
    .neq('teamId', teamId)
    .maybeSingle();

  if (errorTeam) {
    console.log(`Could not find team: ${errorTeam.message}`);
  }

  const botTeamId = !team?.teamId ? firstBidTeamData?.id : team?.teamId;

  if (botTeamId) {
    const { error: errorInsertingBid } = await supabase.from('Bid').insert({
      auctionId: auctionId,
      companyId: companyId,
      gameId: gameId,
      teamId: botTeamId,
      amount: amountBid + currentBidAmount
    });

    if (errorInsertingBid) {
      console.log(`Could not insert bid: ${errorInsertingBid.message}`);
    }
  }
};
