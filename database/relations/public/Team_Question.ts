import { manyToMany } from '../util/manyToMany';

export const Team_Question = manyToMany(
  {
    modelName: 'Question',
    fieldName: 'questions'
  },
  { modelName: 'Team', fieldName: 'teams' },
  {
    fromSide: {
      modelName: 'TeamQuestion',
      fieldName: 'question',
      options: { fields: ['questionId'], references: ['id'] }
    },
    toSide: { modelName: 'TeamQuestion', fieldName: 'team', options: { fields: ['teamId'], references: ['id'] } }
  }
);
