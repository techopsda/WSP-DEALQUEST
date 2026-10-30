import { Earnings } from '@/types/database';
import _ from 'lodash';

export const getCurrentEarnings = (earnings: Earnings[], gameYear: number) => {
  const filteredEarnigns = earnings.filter((earnings) => earnings.year === gameYear);
  return _.sumBy(filteredEarnigns, 'amount');
};
