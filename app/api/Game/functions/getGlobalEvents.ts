import { NotificationMessageObject } from '@/lib/shared/allNotificationTypes';
import { balanceSheetFallback } from '@/lib/shared/balanceSheetFallback';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { BalanceSheet, Game, NotificationToInsert } from '@/types/database';
import _ from 'lodash';

export const getGlobalEvents = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  //fetch all teams in the game along with TeamCompany,  BlanaceSheet and Tournament data
  const { data: Teams } = await supabase
    .from('Team')
    .select('*,TeamCompany(*,Company(risk)), BalanceSheet(*)')
    .eq('gameId', game?.id)
    .eq('BalanceSheet.year', game?.year)
    .is('TeamCompany.yearSold', null);

  //fetching globalEvent for current year
  const { data: globalEvent } = await supabase.from('GlobalEvent').select().eq('orderNo', game?.year).maybeSingle();

  if (Teams) {
    const newBalanceSheetObjectAndNotification = await Promise.all(
      Teams.flatMap(async (team) => {
        const baseNotification = {
          year: game?.year,
          stage: game?.stage,
          type: 'globalEventType',
          teamId: team?.id
        };

        //get currect team's balanceSheet
        const teamBalanceSheet = team?.BalanceSheet[0] ?? (await balanceSheetFallback(team.id, game));

        //get total risk value of the companies that team owns
        const teamTotalRisk = _.sumBy(team?.TeamCompany, (teamCompany) => teamCompany?.Company?.risk ?? 0);

        if (globalEvent?.type === 'positiveRisk' && teamBalanceSheet) {
          return {
            notification: {
              ...baseNotification,
              message: {
                eventOutcome: 'rewarded ',
                messageValue: `${teamTotalRisk ?? 0}`,
                type: 'positive'
              }
            } as NotificationMessageObject,
            newBalanceSheet: {
              ...teamBalanceSheet,
              globalEventFund: teamTotalRisk ?? 0
            } as BalanceSheet
          };
        } else if (globalEvent?.type === 'negativeRisk' && teamBalanceSheet) {
          return {
            notification: {
              ...baseNotification,
              message: {
                messageAction: 'deducted',
                messageValue: `${teamTotalRisk}`,
                type: 'negative'
              }
            } as NotificationMessageObject,
            newBalanceSheet: {
              ...teamBalanceSheet,
              globalEventFund: -teamTotalRisk ?? 0
            } as BalanceSheet
          };
        } else if (globalEvent?.type === 'increaseRates') {
          //update interest rate value

          return {
            notification: {
              ...baseNotification,
              message: {
                eventOutcome: `${globalEvent.name}`,
                type: 'increaseRate'
              }
            } as NotificationMessageObject,
            newBalanceSheet: {
              ...teamBalanceSheet,
              globalEventFund: 0
            } as BalanceSheet
          };
          //need to update interest rate value once known
        } else if (globalEvent?.type === 'maxDebtEquity') {
          return {
            notification: {
              ...baseNotification,
              message: {
                eventOutcome: 'The debt Equity regulation was affected',
                type: 'maxDebtEquity'
              }
            } as NotificationMessageObject,
            newBalanceSheet: {
              ...teamBalanceSheet,
              globalEventFund: 0
            } as BalanceSheet
          };
        } else if (globalEvent?.type === 'neutral') {
          return {
            notification: {
              ...baseNotification,
              message: {
                eventOutcome: 'You have not been rewarded anything from this Global Event',
                type: 'neutral'
              }
            } as NotificationMessageObject,
            newBalanceSheet: {
              ...teamBalanceSheet,
              globalEventFund: 0
            } as BalanceSheet
          };
        }
      })
    );

    const notificationArray = await newBalanceSheetObjectAndNotification.map(
      (data) => data?.notification as NotificationToInsert
    );
    const updatedBalanceSheet = newBalanceSheetObjectAndNotification.map(
      (data) => data?.newBalanceSheet as BalanceSheet
    );

    if (notificationArray) {
      const { error: notificationError } = await supabase.from('Notification').insert(notificationArray);
      if (notificationError) {
        throw new Error(
          'GAME/handlePeriodMove/getGlocalEvents => ERROR INSERTING GLOBAL EVENT NOTIFICATIONS ' +
            notificationError?.message
        );
      }
    }

    if (updatedBalanceSheet) {
      const { error: balanceSheetError } = await supabase.from('BalanceSheet').upsert(updatedBalanceSheet);
      if (balanceSheetError) {
        throw new Error(
          'GAME/handlePeriodMove/getGlocalEvents => ERROR UPSERTING BALANCESHEETS FOR GLOBALEVENTS ' +
            balanceSheetError?.message
        );
      }
    }
  }
};
