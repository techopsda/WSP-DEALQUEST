import { NotificationMessageObject } from '@/lib/shared/allNotificationTypes';
import { Notification } from '@/types/database';
interface MaxDebtFineNotificationProps {
  notification: Notification;
  maxDebtAmount: number;
  fineAmount: number;
}
export const MaxDebtFineNotification: React.FC<MaxDebtFineNotificationProps> = ({
  notification,
  maxDebtAmount,
  fineAmount
}) => {
  const message = notification?.message as NotificationMessageObject;

  return (
    <>
      {message.type === 'notFined' && (
        <p>
          Congratulations! Your debt of{' '}
          <span className="text-success-light font-semibold">${message?.messageValue}m</span> meets the regulatory
          requirement of <span className="text-white font-semibold">${maxDebtAmount}m or less.</span>
        </p>
      )}
      {message.type === 'fined' && (
        <p>
          Your <span className="font-semibold text-white"> debt of ${message.messageValue}m</span> is above the{' '}
          <span className="font-semibold text-white">imposed limit of ${maxDebtAmount}m</span>.{' '}
          <span className="text-error-light font-semibold">You have been fined ${fineAmount}m</span>
        </p>
      )}
    </>
  );
};
