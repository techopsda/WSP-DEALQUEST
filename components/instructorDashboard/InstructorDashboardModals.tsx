import { Game, Tournament } from '@/types/database';
import { EndTournamentModal } from './InstructorDashboardFooter/EndTournamentModal';
import { PauseModal } from './InstructorDashboardFooter/PauseModal';

interface InstructorDashboardModalsProps {
  setEndTournamentModalOpen: (endTournameModalOpen: boolean) => void;
  endTournamentModalOpen: boolean;
  setPauseModalOpen: (pauseModalOpen: boolean) => void;
  pauseModalOpen: boolean;
  endTournament: () => Promise<void>;
  games: Game[];
  tournament: Tournament;
  setPauseError: (pauseError: boolean) => void;
}

export const InstructorDashboardModals: React.FC<InstructorDashboardModalsProps> = ({
  setEndTournamentModalOpen,
  endTournamentModalOpen,
  setPauseModalOpen,
  pauseModalOpen,
  endTournament,
  games,
  tournament,
  setPauseError
}) => {
  return (
    <>
      <PauseModal
        setPauseModalOpen={setPauseModalOpen}
        pauseModalOpen={pauseModalOpen}
        tournament={tournament}
        games={games}
        setPauseError={setPauseError}
      />
      <EndTournamentModal
        setEndTournamentModalOpen={setEndTournamentModalOpen}
        endTournamentModalOpen={endTournamentModalOpen}
        endTournament={async () => {
          setEndTournamentModalOpen(false);
          await endTournament();
        }}
        tournament={tournament}
      />
    </>
  );
};
