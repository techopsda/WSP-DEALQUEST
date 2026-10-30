'use client';

import { useGameDetails } from '@/components/hooks/useGameDetails';
import { TooltipComponent } from '@/components/shared/TooltipComponent';
import { useSettings } from '@/submodules/supabase-functions/lib/settings/useSettings';
import { Game, Team, TeamQuestionsWithAnswers, Tournament } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import clsx from 'clsx';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Joyride as ReactJoyride } from 'react-joyride';
import { useRealtimeTeamQuestions } from '../../../database/hooks/useRealtimeTeamQuestions';
import { Counter } from '../Counter';
import { RoundTextScreen } from '../RoundTextScreen';
import { RoundWrapper } from '../RoundWrapper';
import { FooterDial } from '../shared/FooterDial';
import { getPeriodLengthFromSeconds } from '../shared/getPeriodLengthFromSeconds';
import { calculateQuizFunding } from './calculateQuizFunding';
import { QuestionsActive } from './QuestionsActive';
import { QuestionsSummary } from './QuestionsSummary';
import { getTooltips } from '@/lib/shared/getTooltips';

interface QuestionsProps {
  tournament: Tournament;
  game: Game;
  team: Team;
  teamQuestionAnswers: TeamQuestionsWithAnswers[];
}

export const Questions: React.FC<QuestionsProps> = ({ tournament, game, team, teamQuestionAnswers }) => {
  const { stageTimings } = useGameDetails();

  const [stageEnded, setStageEnded] = useState<boolean>(false);

  //getting game settings values
  const { getSettings } = useSettings<GameSettings>();
  const { questionAmounts, practiceRoundQuestionEarnings, showFullStop } = getSettings([
    'practiceRoundQuestionEarnings',
    'questionAmounts',
    'showFullStop'
  ]);
  //get toAward and  toDeduct values from game settinngs
  const toAward = questionAmounts?.toAward ?? 5;
  const toDeduct = questionAmounts?.toDeduct ?? 2;

  const [showAnswerBar, setShowAnswerBar] = useState<{ show: Boolean; isCorrect: boolean }>({
    show: false,
    isCorrect: false
  });

  const { orderedTeamQuestions, allAnsweredQuestions, allCorrectQuestions, currenRealtimeQuestion } =
    useRealtimeTeamQuestions(
      teamQuestionAnswers,
      `question_updates_${game.id}`,
      'public',
      'TeamQuestion',
      (old: TeamQuestionsWithAnswers, newQuestion: TeamQuestionsWithAnswers) => old.id === newQuestion.id,
      `teamId=eq.${team.id}`
    );
  const [currentQuestion, setCurrentQuestion] = useState<TeamQuestionsWithAnswers | undefined>(currenRealtimeQuestion);
  const quizFunding = calculateQuizFunding(allAnsweredQuestions, toAward, toDeduct);

  const [fundingFrom, setFundingFrom] = useState(quizFunding ?? 0);
  const [fundingTo, setFundingTo] = useState(quizFunding ?? 0);

  const [isAnimationRunning, setIsAnimationRunning] = useState(false);

  function triggerAnimations(isCorrect: boolean) {
    setIsAnimationRunning(true);
    setTimeout(() => {
      setShowAnswerBar({ show: true, isCorrect });
    }, 500);
    setTimeout(() => {
      setShowAnswerBar({ show: false, isCorrect: isCorrect });
      setIsAnimationRunning(false);
    }, 2000);
  }

  useEffect(() => {
    if (currentQuestion !== currenRealtimeQuestion && !isAnimationRunning) {
      setCurrentQuestion(currenRealtimeQuestion);
    }
  }, [currenRealtimeQuestion, isAnimationRunning]);

  useEffect(() => {
    setFundingFrom(fundingTo);
    setFundingTo(quizFunding ?? 0);
  }, [quizFunding]);

  const steps = getTooltips(game.periodType, game.year);

  console.log(currenRealtimeQuestion, 'currenRealtimeQuestion');
  console.log(currentQuestion, 'currentQuestion');
  return (
    <RoundWrapper
      stageCompleteCallback={game.periodType === 'questions' ? () => setStageEnded(true) : undefined}
      tournament={tournament}
      game={game}
      team={team}
      stageTimings={stageTimings}
      showSidebar={game.periodType === 'questionsPre' || game.periodType === 'questionsPost'}
      header="Questions"
      allowSkip={game?.periodType === 'questionsPost'}
      footerText={
        game.periodType === 'questions' && allAnsweredQuestions?.length >= orderedTeamQuestions?.length
          ? 'Waiting for other teams to complete their questions'
          : undefined
      }
      footerSlot={
        game.periodType === 'questions' && (
          <>
            <div
              className={clsx(
                'fixed bottom-0 left-0 w-full p-6 text-white bg-error duration-150',
                showAnswerBar.show ? '-translate-y-[4.8rem]' : 'translate-y-0',
                showAnswerBar.isCorrect ? 'bg-success-dark' : 'bg-error'
              )}
            >
              <p className="font-semibold text-lg">
                {showAnswerBar.isCorrect
                  ? `Correct answer: $${toAward ?? 5}m awarded`
                  : `Incorrect answer: $${toDeduct ?? 2}m deducted`}
              </p>
            </div>

            <FooterDial
              content={
                <>
                  $<Counter from={fundingFrom} to={fundingTo} />m
                </>
              }
              label="Quiz Funding:"
              borderColor={fundingTo >= 5 ? 'border-success-light' : 'border-alpha-highlight'}
              textColor={fundingTo >= 5 ? 'text-success-light' : 'text-white'}
            />
          </>
        )
      }
    >
      {game.periodType === 'questionsPre' && (
        <>
          <ReactJoyride
            run={game.year === 0}
            tooltipComponent={TooltipComponent}
            steps={steps ?? []}

          />
          <RoundTextScreen id="preQuizRoundText" title="Quiz time" isIntro>
            <p>
              Answer as many questions in the next{' '}
              <u className="text-white">{getPeriodLengthFromSeconds('questions', game)}</u> to earn bonus cash for
              investing.
            </p>
            <p>
              Correct answers will <strong className="font-semibold text-success-light">reward ${toAward}m</strong>, but
              wrong answers will <strong className="font-semibold text-error-light">deduct ${toDeduct}m</strong>.
            </p>
            <p>Don&#39;t worry, you can not go below $0 in quiz funding.</p>
          </RoundTextScreen>
        </>
      )}
      {game.periodType === 'questions' && teamQuestionAnswers?.length > 0 && (
        <QuestionsActive
          currentQuestion={currentQuestion}
          allTeamQuestions={orderedTeamQuestions}
          allAnsweredTeamQuestions={allAnsweredQuestions}
          triggerAnimations={triggerAnimations}
          team={team}
          questionAmounts={questionAmounts}
          showFullStop={showFullStop?.visible ?? false}
          game={game}
          stageEnded={stageEnded}
        />
      )}
      {game.periodType === 'questionsPost' && (
        <QuestionsSummary
          allCorrectQuestions={allCorrectQuestions}
          practiceRoundQuestionEarnings={practiceRoundQuestionEarnings?.amount ?? 0}
          allAnsweredQuestions={allAnsweredQuestions}
          amountRewarded={quizFunding ?? 0}
          game={game}
        />
      )}
    </RoundWrapper>
  );
};
