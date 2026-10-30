import { intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';
import { TimerCounter } from '../TimerCounter';

interface CountdownTimerProps {
  currentDifferenceToEnd: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ currentDifferenceToEnd }) => {
  const remainingPeriodTime = intervalToDuration({
    start: 0,
    end: currentDifferenceToEnd <= 0 ? 0 : currentDifferenceToEnd
  });

  const [fromMinutes, setFromMinutes] = useState<number>(remainingPeriodTime?.minutes ?? 0);
  const [toMinutes, setToMinutes] = useState<number>(remainingPeriodTime?.minutes ?? 0);

  const [fromSeconds, setFromSeconds] = useState<number>(remainingPeriodTime?.seconds ?? 0);
  const [toSeconds, setToSeconds] = useState<number>(remainingPeriodTime?.seconds ?? 0);

  useEffect(() => {
    setFromMinutes(toMinutes);
    setToMinutes(remainingPeriodTime?.minutes ?? 0);

    setFromSeconds(toSeconds);
    setToSeconds(remainingPeriodTime?.seconds ?? 0);
  }, [currentDifferenceToEnd]);

  return (
    <span className="text-white font-semibold leading-none translate-y-0.5">
      <TimerCounter fromMinutes={fromMinutes} toMinutes={toMinutes} />:
      <TimerCounter from={fromSeconds} to={toSeconds} fromMinutes={fromMinutes} toMinutes={toMinutes} />
    </span>
  );
};
