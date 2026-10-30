import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Game, Tournament } from '@/types/database';
import { useState } from 'react';
import { InstructorDashboardModals } from './InstructorDashboardModals';
import { InstructorDashboardSidepanel } from './InstructorDashboardSidepanel';

interface InstructorDashboardSettingsProps {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isMenuOpen: boolean;
  setIsFinalYear: (isFinalYear: boolean) => void;
  isFinalYear: boolean;
  endTournament: () => Promise<void>;
  tournament: Tournament;
  games: Game[];
  errorEndingTournament: boolean;
}

export const InstructorDashboardSettings: React.FC<InstructorDashboardSettingsProps> = ({
  setIsMenuOpen,
  isMenuOpen,
  setIsFinalYear,
  isFinalYear,
  endTournament,
  tournament,
  games,
  errorEndingTournament
}) => {
  const { supabase } = useSupabase<'public'>('public');
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [endTournameModalOpen, setEndTournamentModalOpen] = useState(false);
  const [pauseError, setPauseError] = useState(false);

  return (
    <>
      <InstructorDashboardModals
        setEndTournamentModalOpen={setEndTournamentModalOpen}
        endTournamentModalOpen={endTournameModalOpen}
        setPauseModalOpen={setPauseModalOpen}
        pauseModalOpen={pauseModalOpen}
        endTournament={endTournament}
        tournament={tournament}
        games={games}
        setPauseError={setPauseError}
      />
      <InstructorDashboardSidepanel
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        setIsFinalYear={setIsFinalYear}
        isFinalYear={isFinalYear}
        setEndTournamentModalOpen={setEndTournamentModalOpen}
        setPauseModalOpen={setPauseModalOpen}
        tournament={tournament}
        supabase={supabase}
        games={games}
        errorEndingTournament={errorEndingTournament}
        pauseError={pauseError}
      />
    </>
  );
};
