import { AuctionCompanyPurchase } from '@/components/game/data/Notifications/AuctionCompanyPurchase';
import { EquityInvestmentNotification } from '@/components/game/data/Notifications/EquityInvestmentType';
import { FinancingNotification } from '@/components/game/data/Notifications/FinancingNotification';
import { LocalEventNotification } from '@/components/game/data/Notifications/LocalEventNotification';
import { QuizFundingNotification } from '@/components/game/data/Notifications/QuizFundingNotification';
import { Notification, NotificationTypeEnum, TeamWithCompanies } from '@/types/database';
import { GlobalEventNotification } from '@/components/game/data/Notifications/GlobalEventNotification';
import { AccountingNotification } from '@/components/game/data/Notifications/AccountingNotification';
import { EndOfYearEarningsNotification } from '@/components/game/data/Notifications/EndOfYearEarningsNotification';
import { EndOfYearNotification } from '@/components/game/data/Notifications/EndOfYearNotification';
import { MaxDebtFineNotification } from '@/components/game/data/Notifications/MaxDebtFineNotification';

export const getNotificationComponent = (
  type: NotificationTypeEnum,
  notification: Notification,
  companies: TeamWithCompanies[],
  teamId: string,
  maxDebtAmount: number,
  fineAmount: number
) => {
  const filteredTeamCompanies = companies.filter((teamCompanies) => {
    return teamCompanies.teamId === teamId && teamCompanies.yearSold !== null;
  });

  if (notification && type === 'equityInvestmentType') {
    return <EquityInvestmentNotification notification={notification} />;
  } else if (type === 'quizFundingType') {
    return <QuizFundingNotification notification={notification} />;
  } else if (notification && type === 'financingType') {
    return <FinancingNotification notification={notification} teamCompanies={filteredTeamCompanies} />;
  } else if (type === 'auctionType') {
    return <AuctionCompanyPurchase notification={notification} />;
  } else if (notification && type === 'localEventType') {
    return <LocalEventNotification notification={notification} />;
  } else if (type === 'globalEventType') {
    return <GlobalEventNotification notification={notification} />;
  } else if ((type as string) === 'accountingType') {
    return <AccountingNotification notification={notification} />;
  } else if (type === 'endOfYearEarnings') {
    return <EndOfYearEarningsNotification notification={notification} />;
  } else if (type === 'endOfYearType') {
    return <EndOfYearNotification notification={notification} />;
  } else if (type === 'maxDebtFine') {
    return (
      <MaxDebtFineNotification
        notification={notification}
        maxDebtAmount={maxDebtAmount ?? 100}
        fineAmount={fineAmount ?? 300}
      />
    );
  }
};
