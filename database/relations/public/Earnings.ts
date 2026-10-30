import { oneToMany } from '../util/oneToMany';

export const Earnings = oneToMany(
  {
    modelName: 'Earnings',
    fieldName: 'company',
    options: { fields: ['companyId'], references: ['id'] }
  },
  { modelName: 'Company', fieldName: 'earnings' }
);
