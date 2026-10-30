import { Game, Team, Tournament } from '@/types/database';
import { StageTimings } from '@/types/StageTimings';
import { Menu } from '@headlessui/react';
import { GameContentHeader } from './GameContentHeader';
import { GameFooter } from './GameFooter';
import { GameSidebar } from './GameSidebar';
import { periods } from '../../app/api/Game/periods';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { getBalanceSheetYear } from './shared/getBalanceSheetYear';

interface RoundWrapperProps {
  tournament: Tournament;
  game: Game;
  team: Team;
  showSidebar?: boolean;
  header: string;
  subheader?: string;
  stageTimings: StageTimings | null;
  children: React.ReactNode;
  footerSlot?: React.ReactNode;
  justify?: string;
  stageCompleteCallback?: () => void;
  footerText?: string;
  preFooter?: (differenceToEnd: number, stageTimings: StageTimings) => React.ReactNode;
  setSidebarAnimationEnded?: (animationEnded: boolean) => void;
  allowSkip?: boolean;
  hideCountdown?: boolean;
}

export const RoundWrapper: React.FC<RoundWrapperProps> = ({
  tournament,
  game,
  team,
  showSidebar = true,
  header,
  subheader,
  stageTimings,
  children,
  footerSlot,
  justify = 'justify-center',
  stageCompleteCallback,
  footerText,
  preFooter,
  setSidebarAnimationEnded,
  allowSkip,
  hideCountdown
}) => {
  const { fetchPrevBalanceSheet } = getBalanceSheetYear(game.year, tournament?.practiceRound);
  const gameString = game.year === 0 ? 'Practice Year' : `Year ${game.year}`;
  const { supabase } = useSupabase<'public'>('public');

  const updatePeriod = async (periodType: string) => {
    const period = periods.find((period) => period.type === periodType);

    await supabase
      .from('Game')
      .update({ stage: period?.stage, periodType: periodType as any })
      .eq('id', game.id);
  };

  return (
    <div className="fixed w-screen h-screen min-h-[48rem] min-w-[48rem] top-0 left-0 flex overflow-hidden bg-gradient-to-br from-alpha to-alpha-750">
      <div className="grow flex flex-col h-screen">
        <div className="grow overflow-y-auto px-12 py-6">
          <div className="relative flex flex-col gap-12 h-full">
            <GameContentHeader header={header} subheader={subheader ?? gameString} />
            <div className={`grow flex flex-col ${justify} items-center gap-6 pt-24`}>
              {!stageTimings && !process.env.NEXT_PUBLIC_DEV_MODE && <div className="absolute inset-0" />}
              {children}
            </div>
          </div>

          {process.env.NEXT_PUBLIC_DEV_MODE === 'true' && (
            <div className="absolute top-10 z-10">
              <Menu className="relative flex flex-col-reverse w-48" as="div">
                <Menu.Button>Switch Periods</Menu.Button>
                <Menu.Items className="absolute top-8 bg-alpha w-full flex flex-col grow" as="div">
                  {periods.map((period) => {
                    return (
                      <Menu.Item
                        as="button"
                        onClick={() => updatePeriod(period.type)}
                        className="w-full bg-black flex"
                        key={period.type}
                      >
                        {period.type}
                      </Menu.Item>
                    );
                  })}
                </Menu.Items>
              </Menu>
            </div>
          )}
        </div>

        {footerSlot && footerSlot}
        <GameFooter
          stageTimings={stageTimings}
          showShortStats={!showSidebar}
          stageCompleteCallback={stageCompleteCallback}
          footerText={footerText}
          game={game}
          team={team}
          preFooter={preFooter}
          hideCountDown={hideCountdown}
          allowSkip={allowSkip}
          fetchPrevBalanceSheet={fetchPrevBalanceSheet}
        />
      </div>
      <GameSidebar
        team={team}
        isOpen={showSidebar}
        game={game}
        setSidebarAnimationEnded={setSidebarAnimationEnded}
        fetchPrevBalanceSheet={fetchPrevBalanceSheet}
      />
    </div>
  );
};
