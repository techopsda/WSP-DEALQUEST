import { balanceSheetFallback } from '@/lib/shared/balanceSheetFallback';
import { getAsyncSetting } from '@/submodules/supabase-functions/lib/settings/getAsyncSetting';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { BalanceSheet, Game, NotificationToInsert } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import _ from 'lodash';

export const addAccountingEarningsToBalanceSheetAndNotifyTeam = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const accountingAmounts = await getAsyncSetting<GameSettings, 'accountingAmounts'>('accountingAmounts');
  const isNotPracticeRound = game.year > 0;

  // fetch the balanceSheets for team
  const { data: teamsWithBalanceSheet, error } = await supabase
    .from('Team')
    .select('id, BalanceSheet(*), AccountsSheet(*)')
    .eq('AccountsSheet.year', game.year)
    .eq('BalanceSheet.year', game.year)
    .eq('gameId', game.id)
    .eq('tournamentId', game.tournamentId);

  if (error) {
    console.error(error.message);
    return;
  }

  const newBalanceSheetAndNotifications = await Promise.all(
    teamsWithBalanceSheet?.flatMap(async (currentTeam) => {
      const teamBalanceSheet = currentTeam?.BalanceSheet[0] ?? (await balanceSheetFallback(currentTeam.id, game));

      const currentAccountsSheet = currentTeam?.AccountsSheet[0];
      const awardCash = currentAccountsSheet?.cash == true ? accountingAmounts.toAward ?? 5 : 0;
      const awardEquity = currentAccountsSheet?.equity == true ? accountingAmounts.toAward ?? 5 : 0;
      const awardNetIncome = currentAccountsSheet?.netIncome == true ? accountingAmounts.toAward ?? 5 : 0;
      const totalBeanCounterEarnings = isNotPracticeRound
        ? (awardCash ?? 0) + (awardEquity ?? 0) + (awardNetIncome ?? 0)
        : (accountingAmounts.toAward ?? 5) * 3;

      const joiner = new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' });

      const accountsFiled = joiner.format(
        _.compact([
          (isNotPracticeRound ? awardCash ?? 0 : accountingAmounts.toAward ?? 5) > 0 ? 'Cash' : null,
          (isNotPracticeRound ? awardEquity ?? 0 : accountingAmounts.toAward ?? 5) > 0 ? 'Equity' : null,
          (isNotPracticeRound ? awardNetIncome ?? 0 : accountingAmounts.toAward ?? 5) > 0
            ? 'Income statement extract'
            : null
        ])
      );

      const balanceSheetObject = {
        ...teamBalanceSheet,
        cash: (teamBalanceSheet?.cash ?? 0) + totalBeanCounterEarnings,
        equity: (teamBalanceSheet?.equity ?? 0) + totalBeanCounterEarnings
      };

      return {
        notificationsArray: {
          message: {
            eventOutcome: `${accountsFiled}`,
            messageValue: `${totalBeanCounterEarnings}`,
            type: 'incomeStatement'
          },
          type: 'accountingType',
          year: game.year,
          stage: game.stage,
          teamId: currentTeam.id
        } as NotificationToInsert,
        newBalanceSheetObject: balanceSheetObject as BalanceSheet
      };
    })
  );
  const newNotifications = _.map(newBalanceSheetAndNotifications, 'notificationsArray');
  const newBalanceSheets = _.map(newBalanceSheetAndNotifications, 'newBalanceSheetObject');

  const { error: balanceSheetError } = await supabase.from('BalanceSheet').upsert(newBalanceSheets);
  if (balanceSheetError)
    throw new Error(
      `GAME/handlePeriodMove/notifyTeamOnAccountingFinish => year:${game.year}, ERROR UPSERTING BALANCESHEETS:  ${balanceSheetError?.message}`
    );

  const { error: notificationError } = await supabase.from('Notification').insert(newNotifications);
  if (notificationError)
    throw new Error(
      `GAME/handlePeriodMove/notifyTeamOnAccountingFinish => year:${game.year}, ERROR INSERTING NOTIFICATIONS: ${notificationError?.message}`
    );
};
