import { oneToMany } from '../util/oneToMany';

export const BalanceSheet = oneToMany(
  {
    modelName: 'BalanceSheet',
    fieldName: 'team',
    options: { fields: ['teamId'], references: ['id'] }
  },
  { modelName: 'Team', fieldName: 'balanceSheet' }
);
