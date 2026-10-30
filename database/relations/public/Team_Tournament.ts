import { oneToMany } from '../util/oneToMany';

export const Team_Tournament = oneToMany(
  {
    modelName: 'Team',
    fieldName: 'tournament',
    options: { fields: ['tournamentId'], references: ['id'] }
  },
  { modelName: 'Tournament', fieldName: 'team' }
);
