import { oneToMany } from '../util/oneToMany';

export const Member_Team = oneToMany(
  {
    modelName: 'Member',
    fieldName: 'team',
    options: {
      fields: ['teamId'],
      references: ['id']
    }
  },
  { modelName: 'Team', fieldName: 'member' }
);
