import { oneToOne } from '../util/oneToOne';

export const Question = oneToOne(
  {
    modelName: 'Question',
    fieldName: 'correctAnswer',
    options: { name: 'correctAnswer', fields: ['correctAnswerId'], references: ['id'], optional: true }
  },
  { modelName: 'Answer', fieldName: 'correctQuestion', options: { name: 'correctAnswer', optional: true } }
);
