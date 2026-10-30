import { oneToMany } from '../util/oneToMany';

export const Bid_Company = oneToMany(
  {
    modelName: 'Bid',
    fieldName: 'company',
    options: {
      fields: ['companyId'],
      references: ['id']
    }
  },
  { modelName: 'Company', fieldName: 'bid' }
);
