import { getCompaniesNumberForCurrentYear } from '@/lib/shared/getCompaniesNumberForCurrentYear';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { InsertPeriod } from '@/types/database';
import _ from 'lodash';
import { periods } from '../periods';

export const getAuctionPeriods = async (gameId: string, year: number, periodsArray: InsertPeriod[]) => {
  const auctionPeriodIndex = periods.findIndex((period) => period.type === 'auction');
  const auctionPeriod = periods[auctionPeriodIndex];
  const auctionSoldPeriod = periods[auctionPeriodIndex + 1];

  if (year === 0) {
    periodsArray.push({
      ..._.omit(auctionPeriod, 'practiceLength'),
      periodLength: auctionPeriod?.practiceLength,
      periodOrder: periodsArray.length,
      gameId,
      year
    });
    periodsArray.push({
      ..._.omit(auctionSoldPeriod, 'practiceLength'),
      periodLength: auctionSoldPeriod?.practiceLength,
      periodOrder: periodsArray.length,
      gameId,
      year
    });
  } else {
    const supabase = await createSupabaseServerClient<'public'>('public');
    const { data: teams } = await supabase
      .from('Team')
      .select()
      .filter('gameId', 'eq', gameId);

    const numberOfAuctions = getCompaniesNumberForCurrentYear(year, teams?.length ?? 0);

    Array.from({ length: numberOfAuctions ?? 0 }, () => {
      periodsArray.push({
        ..._.omit(auctionPeriod, 'practiceLength'),
        periodLength: auctionPeriod?.periodLength,
        periodOrder: periodsArray.length,
        gameId,
        year
      });
      periodsArray.push({
        ..._.omit(auctionSoldPeriod, 'practiceLength'),
        periodLength: auctionSoldPeriod?.periodLength,
        periodOrder: periodsArray.length,
        gameId,
        year
      });
    });
  }
};
