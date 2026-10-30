import { startNextYear } from '@/lib/game/startNextYear';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Tournament } from '@/types/database';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useIsInstructor from '../hooks/useInstructor';
import DealQuestModal from '../shared/DealQuestModal';

interface InstructorGameScreenFooterProps {
  games: (string | null)[];
  tournament: Tournament;
}

export const InstructorGameScreenFooter: React.FC<InstructorGameScreenFooterProps> = ({ games, tournament }) => {
  const router = useRouter();
  const isInstructor = useIsInstructor();
  const { supabase } = useSupabase<'public'>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startGameModalOpen, setStartGameModalOpen] = useState(false);

  const handleGameStart = async () => {
    setIsLoading(true);

    try {
      const { data: games, error } = await supabase.from('Game').select().eq('tournamentId', tournament?.id);
      if (error) throw error;

      await Promise.all((games ?? []).map((game) => startNextYear(game)));
      setStartGameModalOpen(false);
      if (isInstructor) router.push(`/tournament/${tournament.lobbyCode}/dashboard`);
    } catch (error) {
      console.error('InstructorGameScreenFooter/handleGameStart - FAILED TO START GAMES:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DealQuestModal
        isOpen={startGameModalOpen}
        onCancelClicked={() => setStartGameModalOpen(false)}
        onButtonClicked={handleGameStart}
        titleText={'Start all games'}
        buttonColour="success"
        buttonText={'Confirm'}
        isDisabled={isLoading}
      >
        <span>
          Do <strong className="text-white">not</strong> share your screen after beginning the game. Sensitive details
          will be displayed.
        </span>
      </DealQuestModal>
      <footer className="p-6 bg-alpha-800 fixed bottom-0 left-0 w-full">
        <div className="flex justify-between items-center">
          <p className="max-w-4xl">
            Please make everyone aware all games are about to begin before clicking the "start all games" button. If you
            want teams to move to be sat near other companies in their game now is the time to do so.
          </p>
          <div className="shrink-0 flex items-center gap-6 justify-self-end">
            <div className="text-xl font-semibold text-white">Games Created: {games.length}</div>
            <button className="[ dqButton ] shrink-0" onClick={() => setStartGameModalOpen(true)} disabled={isLoading}>
              Start all games
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
