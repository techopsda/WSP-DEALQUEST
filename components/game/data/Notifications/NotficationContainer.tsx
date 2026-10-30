import { Notification } from '@/types/database';
import { toWords } from 'number-to-words';
import { ReactNode } from 'react';

import { getStageName } from './getStageNameFromNumber';

interface Props {
  notifications: Notification[];
  notification: Notification;
  children: ReactNode;
}

export const NotificationContainer: React.FC<Props> = ({ children, notification }) => {
  return (
    <li id={`${notification.type}Notification`} key={notification.id}>
      <div className="flex gap-3 py-2 text-white">{children}</div>
      {notification.type !== 'endOfYearType' && (
        <p className="text-sm text-alphaLight-800">
          {notification.year === 0 ? 'Practice year' : 'Year ' + toWords(notification.year)} -{' '}
          {getStageName(notification.stage)}
        </p>
      )}
    </li>
  );
};
