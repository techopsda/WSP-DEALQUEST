import { manyToMany } from '../util/manyToMany';

export const Team_LocalEvent = manyToMany(
  { modelName: 'Team', fieldName: 'teamEvents' },
  { modelName: 'LocalEvent', fieldName: 'localEvents' },
  {
    fromSide: {
      modelName: 'TeamLocalEvent',
      fieldName: 'team',
      options: { fields: ['teamId'], references: ['id'] }
    },
    toSide: {
      modelName: 'TeamLocalEvent',
      fieldName: 'localEvent',
      options: { fields: ['localEventId'], references: ['id'] }
    }
  }
);
