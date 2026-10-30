import { balanceSheetFallback } from '@/lib/shared/balanceSheetFallback';
import { getAsyncSetting } from '@/submodules/supabase-functions/lib/settings/getAsyncSetting';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Game, NotificationToInsert } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import _ from 'lodash';

export const insertNotificationOnQuizFinish = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const practiceRoundQuestionEarnings = await getAsyncSetting<GameSettings, 'practiceRoundQuestionEarnings'>(
    'practiceRoundQuestionEarnings'
  );

  const { data: teamsWithBalanceSheet, error } = await supabase
    .from('Team')
    .select('id, BalanceSheet(*)')
    .eq('gameId', game.id)
    .eq('BalanceSheet.year', game.year);

  if (error) {
    console.error(error.message);
    return;
  }

  const quizNotificationsToInsert = await Promise.all(
    teamsWithBalanceSheet
      .map(async (team) => {
        const teamBalanceSheet = team.BalanceSheet[0] ?? (await balanceSheetFallback(team.id, game));

        const quizFund = teamBalanceSheet?.quizFund ?? 0;

        return {
          message: { messageValue: game.year !== 0 ? `${quizFund}` : `${practiceRoundQuestionEarnings?.amount ?? 0}` },
          type: 'quizFundingType',
          year: game.year,
          stage: game.stage,
          teamId: team.id ?? ''
        };
      })
      .filter((notification) => notification !== undefined)
  );
  const { error: errorInsertingNotifications } = await supabase
    .from('Notification')
    .insert(quizNotificationsToInsert as NotificationToInsert[]);

  if (errorInsertingNotifications) {
    throw new Error(
      `GAME/handlePeriodMove/insertNotificationOnQuizFinish => year:${game.year}, ERROR INSERTING NOTIFICATION ON QUIZ FINISH: ${errorInsertingNotifications.message}`
    );
  }
};
