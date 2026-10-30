import { oneToMany } from '../util/oneToMany';

export const Notification_Team = oneToMany(
  {
    modelName: 'Notification',
    fieldName: 'team',
    options: { fields: ['teamId'], references: ['id'], optional: true }
  },
  { modelName: 'Team', fieldName: 'notification' }
);
