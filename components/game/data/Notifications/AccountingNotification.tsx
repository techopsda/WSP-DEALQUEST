import { NotificationMessageObject } from '@/lib/shared/allNotificationTypes';
import { Notification } from '@/types/database';

interface AccountingNotificationProps {
  notification: Notification;
}
export const AccountingNotification: React.FC<AccountingNotificationProps> = ({ notification }) => {
  const message = notification?.message as NotificationMessageObject;
  return (
    <>
      {message?.messageValue !== '0' && (
        <p>
          You were{' '}
          <span className="text-success-light font-semibold">awarded ${message?.messageValue}m FE Dollars</span> for
          your <span className="text-white font-semibold">{message?.eventOutcome}</span> being successfully audited
        </p>
      )}
      {message?.messageValue === '0' && (
        <p>
          You were <span className="font-semibold">awarded $0m FE Dollars</span> as you did not successfully audit any
          of your accounts
        </p>
      )}
    </>
  );
};
