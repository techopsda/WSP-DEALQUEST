import { NotificationMessageObject } from '@/lib/shared/allNotificationTypes';
import { Notification } from '@/types/database';

interface EquityInvestmentProps {
  notification: Notification;
}

export const EquityInvestmentNotification: React.FC<EquityInvestmentProps> = ({ notification }) => {
  const message = notification?.message as NotificationMessageObject;
  return (
    <p>
      Congratulations, you&apos;ve been{' '}
      <strong className="text-success-light font-semibold"> given ${message?.messageValue}m FE Dollars</strong> in Round
      Funding for starting a new year.
    </p>
  );
};
