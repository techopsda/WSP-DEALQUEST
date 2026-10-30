import { oneToMany } from '../util/oneToMany';

export const Auction_Game = oneToMany(
  {
    modelName: 'Auction',
    fieldName: 'game',
    options: {
      fields: ['gameId'],
      references: ['id']
    }
  },
  { modelName: 'Game', fieldName: 'auction' }
);
