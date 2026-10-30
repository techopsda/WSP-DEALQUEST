import { Game, TeamQuestionsWithAnswers } from '@/types/database';
import clsx from 'clsx';
import _ from 'lodash';
import { RoundTextScreen } from '../RoundTextScreen';

interface IQuestionsSummary {
  allAnsweredQuestions: TeamQuestionsWithAnswers[];
  allCorrectQuestions: TeamQuestionsWithAnswers[];
  amountRewarded: number;
  game: Game;
  practiceRoundQuestionEarnings: number;
}

export const QuestionsSummary: React.FC<IQuestionsSummary> = ({
  allCorrectQuestions,
  amountRewarded,
  allAnsweredQuestions,
  game,
  practiceRoundQuestionEarnings
}) => {
  return (
    <div className="flex flex-col items-center gap-12 max-w-5xl">
      <RoundTextScreen
        title={
          <>
            {game.year !== 0 && (
              <>
                You have been{' '}
                {amountRewarded > 0 && <span className="text-success-light">awarded ${amountRewarded}m</span>}
                {amountRewarded <= 0 && <>awarded $0m</>} for answering {allCorrectQuestions?.length ?? 0}/
                {allAnsweredQuestions?.length ?? 0} questions correctly
              </>
            )}
            {game.year === 0 && (
              <>
                Well done! Don&#39;t worry if you got some wrong. It&#39;s just the practice year, let&#39;s give all
                teams <span className="text-success-light">${practiceRoundQuestionEarnings}m</span>.
              </>
            )}
          </>
        }
      />
      {game.year === 0 && (
        <span className="text-2xl text-center">
          You answered {allCorrectQuestions.length}/{allAnsweredQuestions.length} questions correctly. <br /> Which
          would amount to ${amountRewarded}m on a real year.
        </span>
      )}
      <div className="flex flex-wrap justify-center gap-3">
        {_.orderBy(allAnsweredQuestions, 'orderNumber').map((question, index) => {
          const isCorrect = allCorrectQuestions.find(
            (correctQuestion) => question.questionId === correctQuestion.questionId
          );
          const isAnswered = allAnsweredQuestions?.find(
            (teamQuestion) => teamQuestion.id === question.id && teamQuestion.selectedAnswerId !== null
          );

          return (
            <div
              key={index}
              className={clsx(
                'h-9 w-9 justify-center items-center flex rounded-md text-sm text-white',
                isCorrect ? 'bg-success' : isAnswered ? 'bg-error' : 'bg-gray-500'
              )}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};
