import { oneToMany } from '../util/oneToMany';

export const Member_JobTitle = oneToMany(
  {
    modelName: 'Member',
    fieldName: 'jobTitle',
    options: {
      fields: ['jobTitleId'],
      references: ['id']
    }
  },
  { modelName: 'JobTitle', fieldName: 'member' }
);
