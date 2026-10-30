'use client';

import { TooltipComponent } from '@/components/shared/TooltipComponent';
import { getNotificationComponent } from '@/lib/game/getNotificationComponent';
import { useSettings } from '@/submodules/supabase-functions/lib/settings/useSettings';
import { Game, Notification, NotificationTypeEnum, TeamWithCompanies } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import _ from 'lodash';
import { Fragment, useMemo } from 'react';
import { Joyride as ReactJoyride } from 'react-joyride';
import { useRealtime } from '../../../database/hooks/useRealtime';
import { NotificationContainer } from './Notifications/NotficationContainer';
import { getTooltips } from '@/lib/shared/getTooltips';

interface GameNotificationsProps {
  companies: TeamWithCompanies[];
  game: Game;
  initialNotifications: Notification[];
  teamId: string;
  filterNotifications?: boolean;
  htmlDisplayMode: string;
}

export const GameNotifications: React.FC<GameNotificationsProps> = ({
  game,
  teamId,
  initialNotifications,
  companies,
  filterNotifications,
  htmlDisplayMode
}) => {
  const realtimeNotifications = useRealtime<Notification>(
    initialNotifications,
    `allNotifications_${teamId}`,
    'public',
    'Notification',
    () => true,
    [`teamId=eq.${teamId}`, `gameId=eq.${game.id}`]
  );
  const filteredNotifications = useMemo(
    () =>
      filterNotifications
        ? realtimeNotifications.filter((notification) => notification?.year === game?.year)
        : realtimeNotifications,
    [realtimeNotifications]
  );

  const checkNotification = (type: NotificationTypeEnum) => {
    return realtimeNotifications.find((notification) => notification.type === type);
  };

  const runJoyride = () => {
    if (game.year === 0) {
      if (game?.periodType === 'equityInvestment' && checkNotification('equityInvestmentType')) {
        return true;
      }

      if (game?.periodType === 'questionsPost' && checkNotification('quizFundingType')) {
        return true;
      }

      if (game?.periodType === 'auctionPostSummary' && checkNotification('auctionType')) {
        return true;
      }

      if (game?.periodType === 'accountingSummary' && checkNotification('accountingType')) {
        return true;
      }
    }

    return false;
  };

  const { getSettings } = useSettings<GameSettings>();
  const { maxDebtValue, fineAmount } = getSettings(['maxDebtValue', 'fineAmount']);

  const steps = getTooltips(game.periodType, game.year);

  return (
    <>
      <ReactJoyride
        tooltipComponent={TooltipComponent}
        run={runJoyride() && htmlDisplayMode === 'block'}
        steps={steps ?? []}

      />
      <ul className="flex flex-col gap-6">
        {filteredNotifications.length > 0 ? (
          _.orderBy(filteredNotifications, 'createdAt', 'desc').map((notification, index) => (
            <Fragment key={notification.id}>
              <NotificationContainer notification={notification} notifications={filteredNotifications}>
                {getNotificationComponent(
                  notification.type,
                  notification,
                  companies,
                  teamId,
                  maxDebtValue?.amount,
                  fineAmount?.amount
                )}
              </NotificationContainer>
              {index !== filteredNotifications.length - 1 && (
                <li>
                  <hr className="border-0 border-b border-alpha" />
                </li>
              )}
            </Fragment>
          ))
        ) : (
          <li className="flex flex-col gap-3">
            <p className="text-white">Notifications will show up here, followed by the year and round they happened.</p>
            <p className="text-sm text-alphaLight-800">Introduction</p>
          </li>
        )}
      </ul>
    </>
  );
};
