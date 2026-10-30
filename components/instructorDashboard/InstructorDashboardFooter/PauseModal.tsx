import DealQuestModal from '@/components/shared/DealQuestModal';
import { Game, Tournament } from '@/types/database';
import axios from 'axios';
import { API_REQUEST_TIMEOUT_MS } from '@/lib/apiConfig';

interface PauseModalProps {
  pauseModalOpen: boolean;
  setPauseModalOpen: (pauseModalOpen: boolean) => void;
  tournament: Tournament;
  games: Game[];
  setPauseError: (pauseError: boolean) => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  pauseModalOpen,
  setPauseModalOpen,
  tournament,
  games,
  setPauseError
}) => {
  const handleTogglePause = async (pause: boolean) => {
    setPauseError(false);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/Tournament/handleTogglePause`,
        { tournamentId: tournament?.id, pause },
        { timeout: API_REQUEST_TIMEOUT_MS }
      );
    } catch (e) {
      setPauseError(true);
    }
  };

  const isPaused = games.every((game) => game.stagePausedTime);

  return (
    <DealQuestModal
      isOpen={pauseModalOpen}
      onCancelClicked={() => setPauseModalOpen(false)}
      onButtonClicked={() => {
        handleTogglePause(!isPaused);
        setPauseModalOpen(false);
      }}
      titleText={`${!isPaused ? 'Pause' : 'Unpause'} all games for ${games?.length ?? 0} ${
        games?.length === 1 ? 'game' : 'games'
      }?`}
      buttonColour="success"
      buttonText={`${!isPaused ? 'Pause' : 'Unpause'} all games`}
    >
      <span className="text-white text-center">
        {!isPaused
          ? 'This will stop all game timers and progress.'
          : 'This will resume all games from their previous time and progress.'}
      </span>
    </DealQuestModal>
  );
};
