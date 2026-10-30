import { oneToMany } from '../util/oneToMany';

export const Game = oneToMany(
  {
    modelName: 'Game',
    fieldName: 'tournament',
    options: { fields: ['tournamentId'], references: ['id'] }
  },
  { modelName: 'Tournament', fieldName: 'game' }
);
