import { InsertPeriod } from '@/types/database';
import _ from 'lodash';
import { periods } from '../periods';

export const getPreAuctionPeriods = (gameId: string, year: number, periodsArray: InsertPeriod[]) => {
  const auctionIndex = periods.findIndex((periodName) => periodName.type === 'auction');
  const slicedPeriods = _.slice(periods, 0, auctionIndex);
  slicedPeriods
    .filter((period) => year === 0 || (period.type !== 'welcome' && period.type !== 'gamePreview'))
    .forEach((period) => {
      const periodLength = year === 5 && period.type === 'finance' ? period.yearFiveLength : period.periodLength;
      periodsArray.push({
        ..._.omit(period, 'practiceLength', 'yearFiveLength'),
        periodLength: year === 0 ? period?.practiceLength : (periodLength as number),
        periodOrder: periodsArray.length,
        gameId,
        year
      });
    });
};
