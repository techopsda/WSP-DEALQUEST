import { manyToMany } from '../util/manyToMany';
import { oneToMany } from '../util/oneToMany';

export const Team_AccountsSheet = oneToMany(
  {
    modelName: 'AccountsSheet',
    fieldName: 'team',
    options: { fields: ['teamId'], references: ['id'] }
  },
  { modelName: 'Team', fieldName: 'accountsSheet' }
);
