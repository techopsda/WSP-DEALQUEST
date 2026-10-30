import { oneToMany } from '../util/oneToMany';

export const Game_Period = oneToMany(
  {
    modelName: 'Period',
    fieldName: 'game',
    options: { fields: ['gameId'], references: ['id'] }
  },
  { modelName: 'Game', fieldName: 'periodId' }
);
