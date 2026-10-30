import { NotificationMessageObject } from '@/lib/shared/allNotificationTypes';
import { getAsyncSetting } from '@/submodules/supabase-functions/lib/settings/getAsyncSetting';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Game, NotificationTypeEnum } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import _, { isUndefined } from 'lodash';
import { createLocalEventNotification } from './createLocalEventNotification';

interface NotificationForInsert {
  year: number;
  stage: number;
  message: NotificationMessageObject;
  type: NotificationTypeEnum;
  teamId: string;
  gameId: string;
}

export const insertLocalEventNotification = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const localEventAmounts = await getAsyncSetting<GameSettings, 'localEventAmounts'>('localEventAmounts');

  const { data: allTeamsForGame } = await supabase
    .from('Team')
    .select('*, TeamLocalEvent(year, LocalEvent(*))')
    .eq('gameId', game.id)
    .eq('TeamLocalEvent.year', game.year);

  const localEventNotifications =
    allTeamsForGame?.flatMap((team) => {
      const teamLocalEventsArray = team?.TeamLocalEvent;

      return teamLocalEventsArray.flatMap((teamLocalEvent) => {
        const localEvent = teamLocalEvent?.LocalEvent;
        if (!localEvent)
          throw new Error(
            `GAME/handlePeriodMove/insertLocalEventNotification => year:${game.year}, ERROR GETTING LOCAL EVENT FROM TEAM LOCAL EVENT`
          );

        return createLocalEventNotification(team, game, localEvent, localEventAmounts?.amount ?? 5);
      });
    }) ?? [];

  const { error: errorInsertingLocalEventNotification } = await supabase
    .from('Notification')
    .insert(localEventNotifications.filter((notification) => !isUndefined(notification)) as NotificationForInsert[]);

  if (errorInsertingLocalEventNotification)
    throw new Error(
      `GAME/handlePeriodMove/insertLocalEventNotification => year:${game.year}, ERROR INSERT LOCAL EVENT NOTIFICATIONS: ${errorInsertingLocalEventNotification?.message}`
    );
};
