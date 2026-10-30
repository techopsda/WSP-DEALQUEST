import { Answer } from '@/types/database';
import { GameSetting } from '@/types/GameSettings';
import clsx from 'clsx';
import { CheckCircle2, Lock, XCircle } from 'lucide-react';
import { useState } from 'react';
import { getLetterFromIndex } from './getLetterFromIndex';

interface AnswerButtonProps {
  answer: Answer;
  handleAnswerClicked: (answerId: string) => void;
  isSelected: boolean;
  isCorrect: boolean;
  index: number;
  correctAnswerId: string;
  isDisabled: boolean;
  questionAmounts: GameSetting<'questionAmounts'>['questionAmounts'];
  showFullStop: boolean;
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  answer,
  handleAnswerClicked,
  isSelected,
  isCorrect,
  index,
  correctAnswerId,
  isDisabled,
  questionAmounts,
  showFullStop
}) => {
  function handleSelection(answerId: string) {
    setAnswerClicked(true);
    handleAnswerClicked(answerId);

    setTimeout(() => {
      setAnswerClicked(false);
    }, 700);
  }

  const toAward = questionAmounts?.toAward;
  const toDeduct = questionAmounts?.toDeduct;

  const [answerClicked, setAnswerClicked] = useState(false);

  const getButtonColour = () => {
    if (answerClicked) {
      return 'bg-alpha-highlight border-alpha-light-800 text-white';
    }

    if (!isSelected) {
      return 'bg-alpha-light-300 border-transparent text-alpha';
    } else if (isCorrect) {
      return 'bg-success-dark border-success-light text-white';
    } else {
      return 'bg-error border-error-light text-white';
    }
  };

  const getLetterColour = () => {
    if (!isSelected || answerClicked) {
      return 'bg-alpha-light-800 text-alpha';
    } else if (isCorrect) {
      return 'bg-white text-success-dark';
    } else {
      return 'bg-white text-error';
    }
  };

  return (
    <button
      key={answer.id}
      onClick={() => handleSelection(answer.id)}
      className={clsx(`w-full rounded-xl p-6 grid grid-cols-5 gap-6 border-[3px] duration-150`, getButtonColour())}
      disabled={isDisabled}
    >
      <div className="col-span-4 flex items-center gap-6">
        <span
          className={clsx(`shrink-0 relative rounded-full font-bold w-9 h-9 text-lg duration-150`, getLetterColour())}
        >
          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            {getLetterFromIndex(index)}
          </span>
        </span>
        <span className="text-2xl font-medium text-left">
          {answer.answer}
          {showFullStop && answer.id === correctAnswerId ? '.' : ''}
        </span>
      </div>
      <div className="h-full flex gap-6 items-center justify-end">
        {isSelected && answerClicked === false && isCorrect && (
          <>
            <span className="font-bold text-2xl">+${toAward ?? 5}m</span>
            <CheckCircle2 className="shrink-0 w-6 h-6" strokeWidth={2} />
          </>
        )}
        {isSelected && answerClicked === false && !isCorrect && (
          <>
            <span className="font-bold text-2xl">-${toDeduct ?? 2}m</span>
            <XCircle className="shrink-0 w-6 h-6" strokeWidth={2} />
          </>
        )}
        {answerClicked && (
          <>
            <Lock className="shrink-0 w-6 h-6" strokeWidth={2} />
          </>
        )}
      </div>
    </button>
  );
};
