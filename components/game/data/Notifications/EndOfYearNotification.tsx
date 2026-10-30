import { NotificationMessageObject } from '@/lib/shared/allNotificationTypes';
import { Notification } from '@/types/database';
import { CalendarOff } from 'lucide-react';

interface EndOfYearNotificationProps {
  notification: Notification;
}

export const EndOfYearNotification: React.FC<EndOfYearNotificationProps> = ({ notification }) => {
  const message = notification?.message as NotificationMessageObject;

  return (
    <div className="flex gap-x-4 py-6">
      <CalendarOff className="h-6 w-6 text-error-light" />{' '}
      <p className="font-bold text-white uppercase ">{message?.eventOutcome}</p>
    </div>
  );
};
