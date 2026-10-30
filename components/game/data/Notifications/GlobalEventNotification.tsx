import { NotificationMessageObject } from '@/lib/shared/allNotificationTypes';
import { Notification } from '@/types/database';

interface GlobalEventNotificationProps {
  notification: Notification;
}

export const GlobalEventNotification: React.FC<GlobalEventNotificationProps> = ({ notification }) => {
  const message = notification?.message as NotificationMessageObject;
  const { type: globalEventNotificationType } = message;

  return (
    <>
      {globalEventNotificationType === 'positive' && (
        <p>
          You were{' '}
          <span className="text-success-light font-semibold">awarded ${message?.messageValue}m FE Dollars</span> from a
          global event
        </p>
      )}
      {globalEventNotificationType === 'negative' && (
        <p>
          You were <span className="text-error-light font-semibold">deducted ${message?.messageValue}m FE Dollars</span>{' '}
          from a global event
        </p>
      )}
      {globalEventNotificationType === 'neutral' && <p>{message?.eventOutcome}</p>}
      {globalEventNotificationType === 'maxDebtEquity' && <p>{message?.eventOutcome}</p>}
      {globalEventNotificationType === 'increaseRate' && <p>{message?.eventOutcome}</p>}
    </>
  );
};
