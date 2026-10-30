import { manyToMany } from '../util/manyToMany';
import { oneToMany } from '../util/oneToMany';

export const TeamCompany_Company = oneToMany(
  { modelName: 'TeamCompany', fieldName: 'company', options: { fields: ['companyId'], references: ['id'] } },
  { modelName: 'Company', fieldName: 'teamCompany' }
);
