import { NotificationMessageObject } from '@/lib/shared/allNotificationTypes';
import { Notification } from '@/types/database';
import clsx from 'clsx';
interface LocalEventNotificationProps {
  notification: Notification;
}
export const LocalEventNotification: React.FC<LocalEventNotificationProps> = ({ notification }) => {
  const message = notification?.message as NotificationMessageObject;

  return (
    <p>
      You were{' '}
      <span
        className={clsx('font-semibold', message?.type === 'positiveEvent' ? 'text-success-light' : 'text-error-light')}
      >
        {message?.messageAction} ${message?.messageValue}m FE Dollars
      </span>{' '}
      for a local event
    </p>
  );
};
