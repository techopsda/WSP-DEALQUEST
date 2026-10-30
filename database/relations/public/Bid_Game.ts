import { oneToMany } from '../util/oneToMany';

export const Bid_Game = oneToMany(
  {
    modelName: 'Bid',
    fieldName: 'game',
    options: {
      fields: ['gameId'],
      references: ['id']
    }
  },
  { modelName: 'Game', fieldName: 'bid' }
);
