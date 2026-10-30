import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { NotificationTypeEnum } from '@/types/database';
import { NotificationMessageObject } from './allNotificationTypes';

export const createNotification = async (
  message: NotificationMessageObject,
  type: NotificationTypeEnum,
  gameYear: number,
  gameStage: number,
  teamId?: string | null,
  gameId?: string
) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const { error: notificationError } = await supabase
    .from('Notification')
    .insert({
      year: gameYear,
      stage: gameStage,
      message: message,
      type: type,
      teamId: teamId,
      gameId: gameId
    })
    .single();
  if (notificationError) {
    console.log(notificationError.message);
  }
};
