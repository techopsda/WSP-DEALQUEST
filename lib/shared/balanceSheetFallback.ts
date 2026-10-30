import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { BalanceSheet, Game } from '@/types/database';

export const balanceSheetFallback = async (teamId: string, game: Game): Promise<Omit<BalanceSheet, 'id'>> => {
  console.log(
    `GETTING FALLBACK BALANCE SHEET ON PERIOD ${game.periodType} OF YEAR ${game?.year} FOR GAME WITH ID ${game?.id}`
  );

  const supabase = await createSupabaseServerClient<'public'>('public');
  const { data: previousBalanceSheet } = await supabase
    .from('BalanceSheet')
    .select('*')
    .eq('teamId', teamId)
    .eq('year', game.year - 1)
    .maybeSingle();

  if (previousBalanceSheet) {
    const { id: _id, ...balanceSheet } = previousBalanceSheet;

    return {
      ...balanceSheet,
      year: game.year
    };
  } else {
    return {
      auctionSpendings: 0,
      cash: 0,
      debt: 0,
      equity: 0,
      financingFund: 0,
      globalEventFund: 0,
      localEventFund: 0,
      maxDebtFine: 0,
      quizFund: 0,
      roundFund: 100,
      teamId: teamId,
      year: game.year
    };
  }
};
