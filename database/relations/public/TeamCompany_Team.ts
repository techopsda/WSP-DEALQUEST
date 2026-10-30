import { oneToMany } from '../util/oneToMany';

export const TeamCompany_Team = oneToMany(
  { modelName: 'TeamCompany', fieldName: 'team', options: { references: ['id'], fields: ['teamId'] } },
  { modelName: 'Team', fieldName: 'teamCompany' }
);
