import { oneToMany } from '../util/oneToMany';

export const Answer = oneToMany(
  {
    modelName: 'Answer',
    fieldName: 'question',
    options: {
      fields: ['questionId'],
      references: ['id']
    }
  },
  { modelName: 'Question', fieldName: 'answer' }
);
