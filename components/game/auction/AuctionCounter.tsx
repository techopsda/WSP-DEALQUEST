import { StageTimings } from '@/types/StageTimings';
import { useEffect, useState } from 'react';

interface AuctionCounterProps {
  stageTimingsState: StageTimings;
  differenceToEnd: number;
  lastBidTeamId: string | undefined;
  teamId: string;
  auctionTimeElapsed?: (outOfTime: boolean) => void;
}

export const AuctionCounter: React.FC<AuctionCounterProps> = ({
  differenceToEnd,
  teamId,
  lastBidTeamId,
  stageTimingsState,
  auctionTimeElapsed
}) => {
  const [currentColor, setCurrentColor] = useState('');
  const [currentText, setCurrentText] = useState('');
  const { stageEndTime, clockOffset } = stageTimingsState;
  const currentTimeInServerTime = Date.now() - (clockOffset ?? 0);

  useEffect(() => {
    if (currentTimeInServerTime <= stageEndTime.getTime()) {
      setCurrentColor('bg-alpha-light-800');

      if (differenceToEnd > 5000) {
        setCurrentText('');
        auctionTimeElapsed && auctionTimeElapsed(false);
      }
      if (differenceToEnd < 5000) {
        setCurrentColor('bg-warning');
        setCurrentText('Going Once...');
      }

      if (differenceToEnd < 2000) {
        setCurrentColor(lastBidTeamId === teamId ? 'bg-success' : 'bg-error');
        setCurrentText('Going Once... Going Twice...');
      }
      if (differenceToEnd < 1000) {
        auctionTimeElapsed && auctionTimeElapsed(true);
      }
    }
  }, [differenceToEnd]);

  return (
    <>
      {currentColor && currentText && differenceToEnd < 15000 && lastBidTeamId ? (
        <div className={`${currentColor}  p-4`}>
          <p className="text-xl font-semibold text-white">{currentText}</p>
        </div>
      ) : null}
    </>
  );
};
