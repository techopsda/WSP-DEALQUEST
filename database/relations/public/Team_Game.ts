import { oneToMany } from '../util/oneToMany';

export const Team_Game = oneToMany(
  {
    modelName: 'Team',
    fieldName: 'game',
    options: {
      fields: ['gameId'],
      references: ['id'],
      optional: true
    }
  },
  {
    modelName: 'Game',
    fieldName: 'team'
  }
);
