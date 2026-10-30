import { balanceSheetFallback } from '@/lib/shared/balanceSheetFallback';
import { getAsyncSettings } from '@/submodules/supabase-functions/lib/settings/getAsyncSettings';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { BalanceSheet, Finance, Game, NotificationToInsert } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import _ from 'lodash';

export const notifyTeamOnFinanceActivities = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { maxDebtValue, fineAmount } = await getAsyncSettings<GameSettings, 'maxDebtValue' | 'fineAmount'>([
    'maxDebtValue',
    'fineAmount'
  ]);

  const { data: teamsWithBalanceSheetAndFinances, error } = await supabase
    .from('Team')
    .select('id, BalanceSheet(*),Finance(*)')
    .eq('gameId', game.id)
    .eq('BalanceSheet.year', game.year)
    .eq('Finance.year', game.year);

  if (teamsWithBalanceSheetAndFinances) {
    const newBalanceSheetObjectAndNotification = await Promise.all(
      teamsWithBalanceSheetAndFinances.flatMap(async (currentTeamWithBalanceSheet) => {
        const teamBalanceSheet =
          currentTeamWithBalanceSheet?.BalanceSheet[0] ??
          (await balanceSheetFallback(currentTeamWithBalanceSheet.id, game));

        const currentTeamFinancesheet = currentTeamWithBalanceSheet?.Finance[0];

        const maxDebtForTeam = maxDebtValue?.amount ?? 100;
        const fineAmountForTeam = fineAmount?.amount ?? 300;

        const currentTeamDebt = (teamBalanceSheet?.debt ?? 0) - (currentTeamFinancesheet.amountDebtPaid ?? 0);

        //determine debt fine amount
        const fineAmountValue = currentTeamDebt > maxDebtForTeam ? fineAmountForTeam : 0;

        //determine penalty type notification based on debt
        const fineNotificationType = currentTeamDebt > maxDebtForTeam ? 'fined' : 'notFined';
        const currentAmountBorrowed = game.year > 0 ? currentTeamFinancesheet?.amountBorrowed ?? 0 : 20;

        //determine current financingFund value
        const currentFinancingFund =
          (currentTeamFinancesheet?.amountIncomeSale ?? 0) +
          currentAmountBorrowed -
          (currentTeamFinancesheet?.amountDebtPaid ?? 0);

        const amountBorrowedNotification = {
          message: { messageValue: `${currentAmountBorrowed}`, type: 'amountBorrowed' },
          type: 'financingType',
          year: game.year,
          stage: game.stage,
          teamId: currentTeamWithBalanceSheet?.id ?? ''
        } as NotificationToInsert;

        const incomeSaleNotification = {
          message: { messageValue: `${currentTeamFinancesheet?.amountIncomeSale ?? 0}`, type: 'incomeSale' },
          type: 'financingType',
          year: game.year,
          stage: game.stage,
          teamId: currentTeamWithBalanceSheet?.id ?? ''
        } as NotificationToInsert;

        const debtPaidNotification = {
          message: { messageValue: `${currentTeamFinancesheet?.amountDebtPaid}`, type: 'debtPaid' },
          type: 'financingType',
          year: game.year,
          stage: game.stage,
          teamId: currentTeamWithBalanceSheet?.id ?? ''
        } as NotificationToInsert;

        const maxDebtFineNotification = {
          message: {
            messageValue: currentTeamDebt ?? 0,
            type: fineNotificationType
          },
          type: 'maxDebtFine',
          year: game.year,
          stage: game.stage,
          teamId: currentTeamWithBalanceSheet.id
        } as NotificationToInsert;

        return {
          teamNotificationArray:
            game.year === 5
              ? [amountBorrowedNotification, incomeSaleNotification, debtPaidNotification, maxDebtFineNotification]
              : [amountBorrowedNotification],
          updatedFinanceSheet: {
            ...currentTeamFinancesheet,
            amountBorrowed: currentAmountBorrowed
          } as Finance,
          updatedBalanceSheet: {
            ...teamBalanceSheet,
            maxDebtFine: game.year === 5 ? fineAmountValue : 0,
            financingFund: currentFinancingFund
          } as BalanceSheet
        };
      })
    );

    const notificationArray = _.map(newBalanceSheetObjectAndNotification, 'teamNotificationArray');
    const updatedFinanceSheet = _.map(newBalanceSheetObjectAndNotification, 'updatedFinanceSheet');
    const updatedBalanceSheet = _.map(newBalanceSheetObjectAndNotification, 'updatedBalanceSheet');

    //insert income sale, debt paid and borrowing notification for all teams in the game
    const { error: ErrorInsertingNotifications } = await supabase
      .from('Notification')
      .insert(_.flatten(notificationArray));
    if (ErrorInsertingNotifications) {
      throw new Error(
        `GAME/handlePeriodMove/notifyTeamOnFinanceActivities => year:${game.year}, ERROR INSERTING NOTIFICATIONS ARRAY: ${ErrorInsertingNotifications.message}`
      );
    }

    if (updatedBalanceSheet) {
      const { error: balanceSheetError } = await supabase.from('BalanceSheet').upsert(updatedBalanceSheet);
      if (balanceSheetError) {
        throw new Error(
          `GAME/handlePeriodMove/notifyTeamOnFinanceActivities => year:${game.year}, ERROR UPSERTING BALANCESHEETS: ${balanceSheetError?.message}`
        );
      }
    }
    if (updatedFinanceSheet && game.year === 0) {
      const { error: FinanceSheetError } = await supabase.from('Finance').upsert(updatedFinanceSheet);
      if (FinanceSheetError) {
        throw new Error(
          `GAME/handlePeriodMove/notifyTeamOnFinanceActivities => year:${game.year}, ERROR UPSERTING FINANCESHEET: ${FinanceSheetError?.message}`
        );
      }
    }
  }
};
