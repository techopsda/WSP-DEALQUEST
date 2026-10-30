import { Relation } from '../types/Relation';
import { oneToMany } from '../util/oneToMany';

export const Finance: Relation[] = oneToMany(
  {
    modelName: 'Finance',
    fieldName: 'team',
    options: {
      references: ['id'],
      fields: ['teamId']
    }
  },
  { modelName: 'Team', fieldName: 'finance' }
);
