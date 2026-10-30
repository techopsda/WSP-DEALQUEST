import { NotificationMessageObject } from '@/lib/shared/allNotificationTypes';
import { Notification, TeamWithCompanies } from '@/types/database';

interface FinancingNotificationProps {
  notification: Notification;
  teamCompanies: TeamWithCompanies[];
}

export const FinancingNotification: React.FC<FinancingNotificationProps> = ({ notification, teamCompanies }) => {
  const message = notification?.message as NotificationMessageObject;
  const { type: financeNotificationType } = message;
  const messageValue = !isNaN(parseInt(message?.messageValue ?? '')) ? parseInt(message?.messageValue ?? '') : 0;

  return (
    <>
      {financeNotificationType === 'debtPaid' && (
        <p>
          You have{' '}
          <span className="text-success-light font-semibold">paid down ${message?.messageValue}m FE Dollars</span> in
          debt
        </p>
      )}
      {financeNotificationType === 'incomeSale' && (
        <p>
          You have{' '}
          <span className="text-bravo font-semibold">
            sold{' '}
            {(messageValue && teamCompanies.map((teamCompany) => teamCompany?.Company?.name).join(', ')) ||
              '0 companies'}
          </span>{' '}
          making <span className="text-success-light font-semibold">${messageValue}m FE Dollars</span> in income
        </p>
      )}
      {financeNotificationType === 'amountBorrowed' && (
        <p>
          You have{' '}
          <span className="text-warning-light font-semibold">taken on ${message?.messageValue}m FE Dollars</span> in
          debt
        </p>
      )}
    </>
  );
};
