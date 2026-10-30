import { createNotification } from '@/lib/shared/createNotification';
import { getAsyncSetting } from '@/submodules/supabase-functions/lib/settings/getAsyncSetting';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Game } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import _ from 'lodash';

export const insertBalanceSheetForTeam = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const equityInvestmentWinnings = await getAsyncSetting<GameSettings, 'equityInvestmentEarnings'>(
    'equityInvestmentEarnings'
  );

  const { data: allTeamsForGame } = await supabase
    .from('Team')
    .select('*, BalanceSheet(*)')
    .eq('gameId', game.id)
    .eq('BalanceSheet.year', game.year > 0 ? game.year - 1 : 0);

  if (allTeamsForGame && allTeamsForGame.length > 0) {
    const previousBalanceSheets = _.flatMap(
      allTeamsForGame,
      (teamAndBalanceSheet) => teamAndBalanceSheet?.BalanceSheet
    );

    const newBalanceSheets = allTeamsForGame.map((team) => {
      const previousBalanceSheet = previousBalanceSheets?.find((balanceSheet) => balanceSheet?.teamId === team.id);

      return {
        teamId: team.id,
        year: game.year,
        cash: previousBalanceSheet?.cash ?? 0,
        equity: previousBalanceSheet?.equity ?? 0,
        debt: previousBalanceSheet?.debt ?? 0,
        roundFund: equityInvestmentWinnings?.amount ?? 0
      };
    });

    const newFinanceSheets = allTeamsForGame.map((team) => {
      return {
        teamId: team.id,
        year: game.year
      };
    });

    const { data: insertedBalanceSheets, error: insertBalanceSheetError } = await supabase
      .from('BalanceSheet')
      .insert(newBalanceSheets)
      .select();
    if (insertBalanceSheetError)
      throw new Error(
        `GAME/handlePeriodMove/insertBalancesheetForTeam => ERROR INSERTING BALANCE SHEETS: ` +
          insertBalanceSheetError.message
      );
    console.log('NEW BALANCE SHEETS', insertedBalanceSheets);

    const { data: insertedFinanceSheets, error: insertFinanceSheetError } = await supabase
      .from('Finance')
      .insert(newFinanceSheets)
      .select();
    if (insertFinanceSheetError)
      throw new Error(
        `GAME/handlePeriodMove/insertBalancesheetForTeam => ERROR INSERTING FINANCE SHEETS: ` +
          insertFinanceSheetError.message
      );
    console.log('NEW FINANCE SHEETS', insertedFinanceSheets);

    await createNotification(
      {
        messageValue: `${equityInvestmentWinnings?.amount ?? 100}`
      },
      'equityInvestmentType',
      game.year,
      game.stage,
      null,
      game.id
    );
  } else {
    throw new Error(
      'GAME/handlePeriodMove/insertBalancesheetForTeam => ERROR GETTING ALL TEAMS FOR GAME - BALANCE SHEET INSERT - FINANCE SHEET INSERT'
    );
  }
};
