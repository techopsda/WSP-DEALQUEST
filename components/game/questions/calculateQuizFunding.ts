import { TeamQuestionWithQuestion } from '@/types/database';

export const calculateQuizFunding = (
  allAnsweredQuestions: TeamQuestionWithQuestion[],
  toAward: number,
  toDeduct: number
) => {
  let finalQuizFunding = 0;

  for (const answeredQuestion of allAnsweredQuestions) {
    const { selectedAnswerId, Question } = answeredQuestion;

    if (selectedAnswerId === Question?.correctAnswerId) {
      finalQuizFunding += toAward;
    } else if (finalQuizFunding - toDeduct < 0) {
      finalQuizFunding = 0;
    } else {
      finalQuizFunding -= toDeduct;
    }
  }

  return finalQuizFunding;
};
