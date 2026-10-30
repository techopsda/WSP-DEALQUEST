import { Game } from '@/types/database';
import { StageTimings } from '@/types/StageTimings';
import { differenceInMilliseconds } from 'date-fns';
import { useEffect, useState } from 'react';

interface Props {
  stageTimingsState: StageTimings;
  stageCompleteCallback?: () => void;
  differenceToEnd: number;
  game: Game;
}

const CountdownBar: React.FC<Props> = ({ stageCompleteCallback, differenceToEnd, stageTimingsState, game }) => {
  const [currentPercent, setCurrentPercent] = useState(0);
  const [currentColor, setCurrentColor] = useState('bg-alpha-light-800');
  const { stageStartTime, stageEndTime } = stageTimingsState;

  useEffect(() => {
    if (
      currentPercent >= 100 &&
      stageCompleteCallback &&
      stageStartTime?.getTime() === new Date(game?.stageStartTime ?? '').getTime() &&
      stageEndTime?.getTime() === new Date(game?.stageEndTime ?? '').getTime()
    ) {
      stageCompleteCallback();
    }
  }, [currentPercent]);

  useEffect(() => {
    const baseDifference = differenceInMilliseconds(stageEndTime, stageStartTime);

    //add 1000 ms to counteract 1000ms delay on interval
    const percentage =
      ((stageEndTime.getTime() -
        stageStartTime.getTime() -
        differenceToEnd +
        (differenceToEnd === baseDifference ? 0 : 1000)) /
        (stageEndTime.getTime() - stageStartTime.getTime())) *
      100;

    setCurrentColor('bg-alpha-light-800');
    if (percentage > 70) {
      setCurrentColor('bg-gold');
    }

    if (percentage > 85) {
      setCurrentColor('bg-warning');
    }
    if (percentage > 95) {
      setCurrentColor('bg-error');
    }
    setCurrentPercent(percentage < 100 ? percentage : 100);
  }, [differenceToEnd]);

  const transitions = currentPercent > 0 && 'transition-all duration-1000 ease-linear';

  return (
    <div className="w-full h-1.5 bg-gray-800 absolute bottom-0 left-0 overflow-hidden">
      <div
        style={{ transform: `scaleX(${currentPercent / 100})`, transformOrigin: 'left' }}
        className={`${currentColor} ${transitions} rounded-r-2xl h-full`}
      />
    </div>
  );
};

export default CountdownBar;
