import { oneToMany } from '../util/oneToMany';

export const Notification_Game = oneToMany(
  {
    modelName: 'Notification',
    fieldName: 'game',
    options: { fields: ['gameId'], references: ['id'], optional: true }
  },
  { modelName: 'Game', fieldName: 'notification' }
);
