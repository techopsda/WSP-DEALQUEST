import { oneToMany } from '../util/oneToMany';

export const Bid_Auction = oneToMany(
  {
    modelName: 'Bid',
    fieldName: 'auction',
    options: {
      fields: ['auctionId'],
      references: ['id']
    }
  },
  { modelName: 'Auction', fieldName: 'bid' }
);
