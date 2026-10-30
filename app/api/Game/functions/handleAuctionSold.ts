import { createNotification } from '@/lib/shared/createNotification';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Auction } from '@/types/database';

export const handleAuctionSold = async (auction: Auction) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { data: currentGame } = await supabase.from('Game').select().eq('id', auction.gameId).maybeSingle();
  if (!currentGame)
    throw new Error(
      'Game/handlePeriodMove/moveGameToNextAuction/handleAuctionSold => ERROR GETTING GAME ON AUCTION END : No currentGame state '
    );

  const { data: bid } = await supabase
    .from('Bid')
    .select()
    .eq('auctionId', auction.id)
    .order('amount', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!bid) {
    throw new Error(
      'Game/handlePeriodMove/moveGameToNextAuction/handleAuctionSold => ERROR GETTING BID ON AUCTION END : error trying to get the highest bid amount for sold auction'
    );
  }

  const { data: previousBalanceSheet } = await supabase
    .from('BalanceSheet')
    .select()
    .eq('teamId', bid.teamId)
    .eq('year', auction.year)
    .maybeSingle();

  if (previousBalanceSheet) {
    await supabase
      .from('BalanceSheet')
      .update({ auctionSpendings: (previousBalanceSheet?.auctionSpendings ?? 0) + bid.amount })
      .eq('id', previousBalanceSheet?.id)
      .select();
  }

  if (currentGame.year !== 0) {
    const { error: insertTeamCompanyError } = await supabase.from('TeamCompany').insert({
      companyId: auction.companyId,
      teamId: bid.teamId,
      yearBought: auction.year
    });
    if (insertTeamCompanyError)
      throw new Error(
        'Game/handlePeriodMove/moveGameToNextAuction/handleAuctionSold => ERROR INSERTING COMPANY ON AUCTION END : ' +
          insertTeamCompanyError.message
      );
  }

  const { data: company, error: errorCompany } = await supabase
    .from('Company')
    .select()
    .eq('id', auction.companyId)
    .maybeSingle();
  if (!company)
    throw new Error(
      `Game/handlePeriodMove/moveGameToNextAuction/handleAuctionSold =>  ERROR GETTING COMPANY ON AUCTION END : no Company found for id : ${auction.companyId}, ${errorCompany?.message}`
    );

  await createNotification(
    {
      messageValue: `${bid.amount}`,
      companyName: `${company.name}`
    },
    'auctionType',
    currentGame.year,
    currentGame.stage,
    bid.teamId
  );
};
