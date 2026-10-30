import { oneToMany } from '../util/oneToMany';

export const TeamQuestion_Answer = oneToMany(
  {
    modelName: 'TeamQuestion',
    fieldName: 'selectedAnswer',
    options: { fields: ['selectedAnswerId'], references: ['id'], optional: true }
  },
  { modelName: 'Answer', fieldName: 'teamQuestion' }
);
