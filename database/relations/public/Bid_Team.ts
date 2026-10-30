import { oneToMany } from '../util/oneToMany';

export const Bid_Team = oneToMany(
  {
    modelName: 'Bid',
    fieldName: 'team',
    options: {
      references: ['id'],
      fields: ['teamId']
    }
  },
  { modelName: 'Team', fieldName: 'bid' }
);
