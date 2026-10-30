import { useGameDetails } from '@/components/hooks/useGameDetails';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Game, GlobalEvent as GlobalEventType, Team, Tournament } from '@/types/database';
import { useEffect, useState } from 'react';
import { RoundWrapper } from '../RoundWrapper';
import { GlobalEventData } from './GlobalEventData';
import { GlobalEventIntro } from './GlobalEventIntro';

interface GlobalEventProps {
  game: Game;
  team: Team;
  tournament: Tournament;
}

export const GlobalEvent: React.FC<GlobalEventProps> = ({ game, team, tournament }) => {
  const { stageTimings } = useGameDetails();
  const { supabase } = useSupabase<'public'>();
  const [globalEvent, setGlobalEvent] = useState<GlobalEventType>();

  useEffect(() => {
    const getGlobalEvent = async () => {
      const { data: globalEventData } = await supabase
        .from('GlobalEvent')
        .select('*')
        .eq('orderNo', game.year)
        .limit(1)
        .single();

      setGlobalEvent(globalEventData as GlobalEventType);
    };
    getGlobalEvent();
  }, []);

  return (
    <>
      <RoundWrapper
        tournament={tournament}
        game={game}
        allowSkip={game?.periodType === 'globalEvent'}
        team={team}
        header="Global Event"
        stageTimings={stageTimings}
      >
        {(game.periodType as 'globalEventPre') === 'globalEventPre' && <GlobalEventIntro />}

        {game.periodType === 'globalEvent' && globalEvent && (
          <GlobalEventData globalEvent={globalEvent} teamId={team.id} />
        )}
      </RoundWrapper>

      {/* Scoped styles used so that the event data does not need to include classes for text colour and font weight */}
      <style scoped>
        {`
          strong {
            color: white;
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
};
