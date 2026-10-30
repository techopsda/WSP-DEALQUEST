import { NotificationMessageObject } from '@/lib/shared/allNotificationTypes';
import { Notification } from '@/types/database';

interface EndOfYearEarningsNotificationProps {
  notification: Notification;
}

export const EndOfYearEarningsNotification: React.FC<EndOfYearEarningsNotificationProps> = ({ notification }) => {
  const message = notification?.message as NotificationMessageObject;

  return (
    <p>
      You have been{' '}
      <span className="text-success-light font-semibold">awarded ${message?.messageValue}m FE Dollars</span> in company
      earnings
    </p>
  );
};
