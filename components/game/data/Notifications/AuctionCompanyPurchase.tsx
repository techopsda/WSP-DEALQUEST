import { NotificationMessageObject } from '@/lib/shared/allNotificationTypes';
import { Notification } from '@/types/database';

interface AuctionCompanyPurchasedProps {
  notification: Notification;
}

export const AuctionCompanyPurchase: React.FC<AuctionCompanyPurchasedProps> = ({ notification }) => {
  const message = notification?.message as NotificationMessageObject;
  return (
    <p>
      Congratulations, you have purchsed <span className="text-bravo font-semibold">{message?.companyName}</span> at a
      cost of <strong className="text-error-light font-semibold">{`$${message?.messageValue}m FE Dollars`}</strong>
    </p>
  );
};
