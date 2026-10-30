import { NotificationMessageObject } from '@/lib/shared/allNotificationTypes';
import { Notification } from '@/types/database';

interface QuizFundingNotificationProps {
  notification: Notification;
}

export const QuizFundingNotification: React.FC<QuizFundingNotificationProps> = ({ notification }) => {
  const message = notification?.message as NotificationMessageObject;

  return (
    <p>
      You were{' '}
      <strong className="text-success-light font-semibold"> awarded ${message?.messageValue}m FE Dollars</strong> in
      quiz funding
    </p>
  );
};
