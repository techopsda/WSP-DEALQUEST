import { handleStageScreensAndTimings } from '@/lib/game/handleStageScreensAndTimings';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Game } from '@/types/database';
import { StageTimings } from '@/types/StageTimings';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useTimeout } from '../hooks/useTimeout';
import { GameDetailsProvider } from './GameDetailsProvider';
import { backOff } from 'exponential-backoff';
import { readyUpTeam } from '@/lib/team/readyUpTeam';

interface Props {
  teamId: string;
  game: Game;
}

export const GameWrapper: React.FC<PropsWithChildren<Props>> = ({ game, teamId, children }) => {
  const { supabase } = useSupabase<'public'>();
  const [stageTimings, setStageTimings] = useState<StageTimings | null>(null);
  const [timeoutObject, setCurrenTimeoutObject] = useTimeout();

  useEffect(() => {
    const periodComplete = async () => {
      try {
        await backOff(() => readyUpTeam(game, teamId), {
          startingDelay: 500,
          numOfAttempts: 5
        });
      } catch (e) {
        console.error('GameWrapper/periodComplete - FAILED TO READY UP TEAM AFTER ALL RETRIES:', e);
      }
    };

    const fetchGameTimings = async () => {
      let currentServerTime: string | null = null;

      try {
        currentServerTime = await backOff(
          async () => {
            const { data, error } = await supabase.rpc('get_current_server_time');
            if (error) throw error;
            if (!data) throw new Error('GameWrapper/fetchGameTimings - NO SERVER TIME RETURNED');
            return data;
          },
          { startingDelay: 500, numOfAttempts: 5 }
        );
      } catch (error) {
        console.error('GameWrapper/fetchGameTimings - FAILED TO GET SERVER TIME AFTER ALL RETRIES:', error);
        return;
      }

      if (currentServerTime) {
        const { stageStartTime, stageEndTime, stagePausedTime } = game;

        const currentTime = new Date(currentServerTime);
        const startTimeAsDate = stageStartTime ? new Date(stageStartTime) : undefined;
        const endTimeAsDate = stageEndTime ? new Date(stageEndTime) : undefined;

        if (stagePausedTime && startTimeAsDate) {
          setStageTimings(null);
          setCurrenTimeoutObject({ ms: 0, callback: () => null });
        }

        if (startTimeAsDate && currentTime && endTimeAsDate) {
          const period = handleStageScreensAndTimings({
            stageStartTime: startTimeAsDate,
            currentTime,
            stageEndTime: endTimeAsDate
          });

          if (game.status !== 'waitingForNextYear') {
            setCurrenTimeoutObject({
              ms: period.difference > 0 ? period.difference : 0,
              callback: periodComplete
            });

            setStageTimings(period.stageTimings);
          }
        }
      }
    };
    fetchGameTimings();
  }, [game?.stageStartTime, game?.stageEndTime, game?.stagePausedTime]);

  return <GameDetailsProvider stageTimings={stageTimings}>{children}</GameDetailsProvider>;
};
