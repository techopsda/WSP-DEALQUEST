import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Game, Team, TeamQuestionsWithAnswers } from '@/types/database';
import _ from 'lodash';
import { Fragment, useMemo, useState } from 'react';
import { AnswerButton } from './AnswerButton';
import { QuestionTable } from './QuestionTable';
import clsx from 'clsx';
import { GameSetting } from '@/types/GameSettings';
import { readyUpTeam } from '@/lib/team/readyUpTeam';

interface QuestionsActiveProps {
  currentQuestion: TeamQuestionsWithAnswers | undefined;
  allTeamQuestions: TeamQuestionsWithAnswers[];
  allAnsweredTeamQuestions: TeamQuestionsWithAnswers[];
  triggerAnimations: (isCorrect: boolean) => void;
  team: Team;
  questionAmounts: GameSetting<'questionAmounts'>['questionAmounts'];
  showFullStop: boolean;
  game: Game;
  stageEnded: boolean;
}

export const QuestionsActive: React.FC<QuestionsActiveProps> = ({
  currentQuestion,
  allTeamQuestions,
  allAnsweredTeamQuestions,
  triggerAnimations,
  team,
  questionAmounts,
  showFullStop,
  game,
  stageEnded
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const { supabase } = useSupabase<'public'>();

  //randomise answers
  const randomisedAnswers = useMemo(() => _.shuffle(currentQuestion?.Question?.Answer), [currentQuestion]);

  //update teamquesitions with selectedAnswerId
  const handleAnswerClicked = async (teamId: string, answerId: string) => {
    setSelectedAnswer(answerId);
    triggerAnimations(answerId === currentQuestion?.Question?.correctAnswerId);

    if (currentQuestion?.Question?.id && !currentQuestion?.selectedAnswerId) {
      console.log('is updatingTeamQuestion now');
      const { error: errorUpdateTeamQuestion } = await supabase
        .from('TeamQuestion')
        .update({
          selectedAnswerId: answerId
        })
        .eq('questionId', currentQuestion?.questionId)
        .eq('teamId', teamId)
        .single();
      if (errorUpdateTeamQuestion) {
        console.log(errorUpdateTeamQuestion.message);
      }
    }
    setTimeout(async () => {
      setSelectedAnswer(undefined);
    }, 2000);

    //move teams to next stage based on realtime teamQuestions
    if (allAnsweredTeamQuestions?.length === allTeamQuestions?.length - 1) {
      await readyUpTeam(game, team?.id);
    }
  };

  return (
    <div
      className={clsx(
        'w-full flex flex-col items-center gap-12 pb-24',
        currentQuestion?.Question?.type === 'tabular' ? 'max-w-7xl' : 'max-w-5xl'
      )}
    >
      {!currentQuestion && (
        <>
          <h1 className="text-white font-bold text-center max-w-3xl text-5xl">
            You have answered all of the available questions this round
          </h1>
          <p>Please wait for the other teams to finish or for the timer to run out.</p>
        </>
      )}
      {currentQuestion && (
        <div className="w-full flex flex-col gap-12">
          <div className="text-center">
            <span className="text-lg">Question {currentQuestion.orderNumber}</span>
            <p className="text-white font-semibold text-4xl">{currentQuestion?.Question?.name}</p>
          </div>
          <div
            className={clsx(
              'w-full',
              currentQuestion?.Question?.type === 'tabular'
                ? 'grid grid-cols-2 gap-24'
                : 'flex flex-col gap-12 items-center'
            )}
          >
            {currentQuestion?.Question?.type === 'tabular' && <QuestionTable question={currentQuestion?.Question} />}
            <div className="flex flex-col gap-6 pb-12 w-full max-w-3xl">
              {randomisedAnswers?.map((answer, index) => {
                const isSelected = selectedAnswer === answer.id;
                const isCorrect = currentQuestion?.Question?.correctAnswerId === selectedAnswer;
                return (
                  <Fragment key={`${answer}-${index}`}>
                    <AnswerButton
                      answer={answer}
                      handleAnswerClicked={(answerId: string) => handleAnswerClicked(currentQuestion.teamId, answerId)}
                      isSelected={isSelected}
                      isCorrect={isCorrect}
                      index={index}
                      isDisabled={(selectedAnswer !== null && selectedAnswer !== undefined) || stageEnded}
                      correctAnswerId={currentQuestion?.Question?.correctAnswerId ?? ''}
                      questionAmounts={questionAmounts}
                      showFullStop={showFullStop}
                    />
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
