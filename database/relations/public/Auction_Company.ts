import { oneToMany } from '../util/oneToMany';

export const Auction_Company = oneToMany(
  {
    modelName: 'Auction',
    fieldName: 'company',
    options: {
      fields: ['companyId'],
      references: ['id']
    }
  },
  { modelName: 'Company', fieldName: 'auction' }
);
