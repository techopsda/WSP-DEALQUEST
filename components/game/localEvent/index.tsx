import { useGameDetails } from '@/components/hooks/useGameDetails';
import { Game, LocalEvent as LocalEventType, Team, TeamLocalEventWithLocalEvent, Tournament } from '@/types/database';
import { useEffect, useState } from 'react';
import { RoundTextScreen } from '../RoundTextScreen';
import { RoundWrapper } from '../RoundWrapper';
import { Card } from './Card';
import FestivalImage from '../../../public/card-illustrations/festival.svg';
import BadNewsImage from '../../../public/card-illustrations/badnews.svg';
import clsx from 'clsx';
import { LocalEventIntro } from './LocalEventIntro';
import { LocalEventSummary } from './LocalEventSummary';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useSettings } from '@/submodules/supabase-functions/lib/settings/useSettings';
import { GameSettings } from '@/types/GameSettings';
import { readyUpTeam } from '@/lib/team/readyUpTeam';

interface Props {
  tournament: Tournament;
  game: Game;
  team: Team;
}

export const LocalEvent: React.FC<Props> = ({ tournament, game, team }) => {
  const { stageTimings } = useGameDetails();

  const [isFlippedOne, setIsFlippedOne] = useState(false);
  const [isFlippedTwo, setIsFlippedTwo] = useState(false);
  const [isFlippedThree, setIsFlippedThree] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [teamLocalEvent, setTeamLocalEvent] = useState<TeamLocalEventWithLocalEvent>();

  const localEvent = teamLocalEvent?.LocalEvent;

  const { getSetting } = useSettings<GameSettings>();
  const localEventAmount = getSetting('localEventAmounts');

  const { supabase } = useSupabase<'public'>();

  const CardClicked = async (card: number) => {
    setIsDisabled(true);

    if (!teamLocalEvent?.cardSelected && team?.status !== 'awaitingNextPeriod') {
      await supabase
        .from('TeamLocalEvent')
        .update({ cardSelected: card })
        .eq('teamId', team?.id)
        .eq('year', game?.year);
      await readyUpTeam(game, team?.id);
    }

    if (card === 1) {
      setIsFlippedOne(true);
    } else if (card === 2) {
      setIsFlippedTwo(true);
    } else {
      setIsFlippedThree(true);
    }
  };

  useEffect(() => {
    if (team?.status === 'awaitingNextPeriod' && game?.periodType === 'localEvent' && teamLocalEvent?.cardSelected)
      CardClicked(teamLocalEvent?.cardSelected);
  }, [teamLocalEvent]);

  useEffect(() => {
    const getLocalEvent = async () => {
      const { data: teamEventData } = await supabase
        .from('TeamLocalEvent')
        .select('*, LocalEvent(*)')
        .eq('teamId', team.id)
        .eq('year', game.year)
        .maybeSingle();

      if (teamEventData) {
        const newLocalEvent = teamEventData?.LocalEvent;

        setTeamLocalEvent({ ...teamEventData, LocalEvent: newLocalEvent } as TeamLocalEventWithLocalEvent);
      }
    };

    getLocalEvent();
  }, [game, team?.status]);

  const getFooterText = () => {
    if (game.periodType === 'localEvent') {
      if (!isDisabled) return 'Select a local event';
      else return 'Waiting for all teams to select a local event';
    }
  };

  return (
    <RoundWrapper
      tournament={tournament}
      game={game}
      team={team}
      header="Local Event"
      stageTimings={stageTimings}
      allowSkip={game?.periodType === 'localEventPost'}
      showSidebar={
        (game.periodType as 'localEventPre') === 'localEventPre' ||
        (game.periodType as 'localEventPost') === 'localEventPost'
      }
      stageCompleteCallback={game?.periodType === 'localEvent' && !isDisabled ? () => CardClicked(2) : undefined}
      footerText={getFooterText()}
    >
      {(game.periodType as 'localEventPre') === 'localEventPre' && <LocalEventIntro />}

      {game.periodType === 'localEvent' && (
        <div className="w-full flex flex-col items-center gap-12">
          <RoundTextScreen title="Pick a card, any card..." isIntro>
            <p>If you don&apos;t pick before the timer expires, we will choose for you.</p>
          </RoundTextScreen>

          {localEvent && (
            <div className="w-full grid grid-cols-3 gap-9 mt-12 max-w-6xl pb-12">
              <button
                className={clsx('relative duration-150', !isDisabled && 'hover:-translate-y-1.5')}
                disabled={isDisabled}
                onClick={() => CardClicked(1)}
              >
                <Card
                  title={localEvent?.name}
                  text={localEvent?.description}
                  type={localEvent?.type}
                  image={localEvent?.type === 'negative' ? BadNewsImage?.src : FestivalImage?.src}
                  flipped={isFlippedOne}
                  localEventAmount={localEventAmount?.amount ?? 5}
                />
              </button>
              <button
                className={clsx('relative duration-150', !isDisabled && 'hover:-translate-y-1.5')}
                disabled={isDisabled}
                onClick={() => CardClicked(2)}
              >
                <Card
                  title={localEvent?.name}
                  text={localEvent?.description}
                  type={localEvent?.type}
                  image={localEvent?.type === 'negative' ? BadNewsImage?.src : FestivalImage?.src}
                  flipped={isFlippedTwo}
                  localEventAmount={localEventAmount?.amount ?? 5}
                />
              </button>
              <button
                className={clsx('relative duration-150', !isDisabled && 'hover:-translate-y-1.5')}
                disabled={isDisabled}
                onClick={() => CardClicked(3)}
              >
                <Card
                  title={localEvent?.name}
                  text={localEvent?.description}
                  type={localEvent?.type}
                  image={localEvent?.type === 'negative' ? BadNewsImage?.src : FestivalImage?.src}
                  flipped={isFlippedThree}
                  localEventAmount={localEventAmount?.amount ?? 5}
                />
              </button>
            </div>
          )}
        </div>
      )}

      {game.periodType === 'localEventPost' && localEvent && (
        <LocalEventSummary localEvent={localEvent as LocalEventType} localEventAmount={localEventAmount?.amount ?? 5} />
      )}
    </RoundWrapper>
  );
};
