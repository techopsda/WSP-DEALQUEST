import { oneToMany } from '../util/oneToMany';

export const Company = oneToMany(
  {
    modelName: 'Company',
    fieldName: 'sector',
    options: {
      fields: ['sectorId'],
      references: ['id']
    }
  },
  { modelName: 'Sector', fieldName: 'company' }
);
