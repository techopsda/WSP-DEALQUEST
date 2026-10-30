import DealQuestModal from '@/components/shared/DealQuestModal';
import { startNextYear } from '@/lib/game/startNextYear';
import { Game, Tournament } from '@/types/database';
import { Database } from '@/types/supabase';
import { Switch } from '@headlessui/react';
import { SupabaseClient } from '@supabase/supabase-js';
import { handleFinalYearToggle } from '../handleFinalYearToggle';
import { useState } from 'react';

interface StartNextYearModalProps {
  setStartNextYearModalOpen: (startNextYearModalOpen: boolean) => void;
  startNextYearModalOpen: boolean;
  setIsFinalYear: (isFinalYear: boolean) => void;
  isFinalYear: boolean;
  tournament: Tournament;
  supabase: SupabaseClient<Database, 'public'>;
  unreadyGames: number;
  games: Game[];
}

export const StartNextYearModal: React.FC<StartNextYearModalProps> = ({
  setStartNextYearModalOpen,
  startNextYearModalOpen,
  setIsFinalYear,
  isFinalYear,
  tournament,
  supabase,
  unreadyGames,
  games
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStartNextYear = async () => {
    setIsLoading(true);

    try {
      if (games && games[0]?.year !== tournament.finalYear) {
        await Promise.all(games?.map((game) => startNextYear(game, isFinalYear ? 'finalYear' : 'active')));
        await handleFinalYearToggle(
          supabase,
          tournament.id,
          games[0]?.year + 1,
          isFinalYear || games[0]?.year === 5,
          games?.map((game) => ({ ...game, year: game?.year + 1 }))
        );
      }

      setStartNextYearModalOpen(false);
    } catch (error) {
      console.error('StartNextYearModal/handleStartNextYear - FAILED TO START NEXT YEAR:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DealQuestModal
      isOpen={startNextYearModalOpen}
      onCancelClicked={() => setStartNextYearModalOpen(false)}
      onButtonClicked={handleStartNextYear}
      titleText={`Start the next year for all games?`}
      buttonColour="success"
      buttonText="Start the next year"
      isDisabled={isLoading}
    >
      {unreadyGames > 0 && (
        <span className="text-white text-center">
          This will{' '}
          <strong>
            exclude {unreadyGames} {unreadyGames === 1 ? 'game' : 'games'} from the tournament
          </strong>{' '}
          are you sure?
        </span>
      )}
      {games[0]?.year !== 5 && (
        <div className="text-white flex justify-center items-center gap-2">
          <span>End games at the end of this year</span>
          <Switch
            disabled={games[0].year === 6}
            checked={isFinalYear}
            onChange={async () => {
              setIsFinalYear(!isFinalYear);
            }}
            className={`${
              isFinalYear ? 'bg-success' : 'bg-error'
            } shrink-0 relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                isFinalYear ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      )}
      {games[0]?.year === 5 && (
        <span className="text-white">
          The next year will be the <strong>final</strong> year
        </span>
      )}
      <span className="text-white text-center">
        Starting the next year is <strong>irreversible</strong>
      </span>
    </DealQuestModal>
  );
};
