import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';

export const updateBalanceSheet = async (
  ammount: number,
  teamCash: number,
  teamEquity: number,
  gameYear: number,
  teamId: string
) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { error: balanceSheetError } = await supabase
    .from('BalanceSheet')
    .update({ cash: teamCash + ammount, equity: teamEquity + ammount })
    .eq('year', gameYear)
    .eq('teamId', teamId)
    .single();
  if (balanceSheetError) {
    console.log(balanceSheetError.message);
  }
};
