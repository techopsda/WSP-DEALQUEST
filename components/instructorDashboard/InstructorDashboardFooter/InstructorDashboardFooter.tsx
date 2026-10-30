import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Game, Tournament } from '@/types/database';
import { useState } from 'react';
import InprogressGamesFooter from './InprogressGamesFooter';
import { StartNextYearModal } from './StartNextYearModal';
import TeamReadyFooter from './TeamReadyFooter';

interface InstructorDashboardFooterProps {
  setIsFinalYear: (isFinalYear: boolean) => void;
  isFinalYear: boolean;
  games: Game[];
  tournament: Tournament;
}

const InstructorDashboardFooter: React.FC<InstructorDashboardFooterProps> = ({
  games,
  tournament,
  isFinalYear,
  setIsFinalYear
}) => {
  const [startNextYearModalOpen, setStartNextYearModalOpen] = useState(false);

  const { supabase } = useSupabase<'public'>();

  const allReadyGames = games?.filter((game) => game?.status === 'waitingForNextYear')?.length;
  const allGamesInProgress = games?.filter((game) => game?.status === 'active')?.length;
  const unreadyGames = games?.length - allReadyGames;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-alpha-900">
      <StartNextYearModal
        setStartNextYearModalOpen={setStartNextYearModalOpen}
        startNextYearModalOpen={startNextYearModalOpen}
        setIsFinalYear={setIsFinalYear}
        isFinalYear={isFinalYear}
        tournament={tournament}
        supabase={supabase}
        unreadyGames={unreadyGames}
        games={games}
      />
      <TeamReadyFooter
        handleStartNextYear={() => setStartNextYearModalOpen(true)}
        games={games}
        allReadyGames={allReadyGames}
        allGamesInProgress={allGamesInProgress}
      />
      <InprogressGamesFooter games={games} tournament={tournament} />
    </div>
  );
};

export default InstructorDashboardFooter;
