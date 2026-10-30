import { Game, Tournament } from '@/types/database';
import { Database } from '@/types/supabase';
import { Disclosure, Switch } from '@headlessui/react';
import { SupabaseClient } from '@supabase/supabase-js';
import clsx from 'clsx';
import { CalendarX, ChevronRight, LogOut, PauseCircle, PlayCircle } from 'lucide-react';
import SlidePanel from '../shared/SlidePanel';
import { handleFinalYearToggle } from './handleFinalYearToggle';
import { SidepanelErrorBox } from './SidepanelErrorBox';

interface InstructorDashboardSidePanelProps {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isMenuOpen: boolean;
  setIsFinalYear: (isFinalYear: boolean) => void;
  isFinalYear: boolean;
  setEndTournamentModalOpen: (endTournamentModalOpen: boolean) => void;
  setPauseModalOpen: (pauseModalOpen: boolean) => void;
  games: Game[];
  tournament: Tournament;
  supabase: SupabaseClient<Database, 'public'>;
  errorEndingTournament: boolean;
  pauseError: boolean;
}

export const InstructorDashboardSidepanel: React.FC<InstructorDashboardSidePanelProps> = ({
  setIsMenuOpen,
  isMenuOpen,
  setIsFinalYear,
  isFinalYear,
  setEndTournamentModalOpen,
  setPauseModalOpen,
  games,
  tournament,
  supabase,
  errorEndingTournament,
  pauseError
}) => {
  const tournamentPaused = games.every((game) => game?.stagePausedTime);

  return (
    <>
      <SlidePanel title="Instructor options" isOpen={isMenuOpen} onCancelClicked={() => setIsMenuOpen(false)}>
        <nav className="h-full">
          <ul className="h-full flex flex-col border-t border-alpha-400">
            <li className="border-b border-alpha-400">
              <button
                onClick={() => setPauseModalOpen(true)}
                className="p-6 font-bold w-full block text-left uppercase flex items-center gap-3 duration-150 | hover:bg-alpha-400"
              >
                {!tournamentPaused && <PauseCircle className="w-6 h-6" />}
                {tournamentPaused && <PlayCircle className="w-6 h-6" />}
                <span>
                  {!tournamentPaused && 'Pause all games'}
                  {tournamentPaused && 'Unpause all games'}
                </span>
              </button>
            </li>

            {games[0]?.periodType !== 'yearEnd' && games[0]?.periodType !== 'gameEnd' && games[0]?.year !== 6 && (
              <li className="border-b border-alpha-400">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="p-6 font-bold w-full block text-left uppercase flex items-center gap-3 duration-150 | hover:bg-alpha-400">
                        <div className="w-full flex items-center gap-3">
                          <CalendarX />
                          <div className="grow flex items-center justify-between">
                            <p className="">End games at the end of this year?</p>
                            <div className="flex items-center gap-6">
                              <ChevronRight
                                className={clsx('duration-150 text-alpha-light-800', open && 'rotate-90 transform')}
                              />
                            </div>
                          </div>
                        </div>
                      </Disclosure.Button>
                      <Disclosure.Panel className="p-6 flex items-center gap-6">
                        <span>No, keep playing</span>
                        <Switch
                          checked={isFinalYear}
                          onChange={async (e) => {
                            await handleFinalYearToggle(supabase, tournament.id, games[0]?.year, e, games);
                            setIsFinalYear(!isFinalYear);
                          }}
                          className={`${
                            isFinalYear ? 'bg-success' : 'bg-error'
                          } shrink-0 relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">End games at the end of this year</span>
                          <span
                            className={`${
                              isFinalYear ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                        <span>Yes, end games this year</span>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </li>
            )}

            <SidepanelErrorBox visible={pauseError} message={'Failed to pause tournament'} />

            <li className="mt-auto">
              <SidepanelErrorBox visible={errorEndingTournament} message={'Failed to end all games and quit'} />
              <button
                className="p-6 bg-error font-bold w-full block text-left uppercase flex items-center gap-3"
                onClick={() => setEndTournamentModalOpen(true)}
              >
                <LogOut className="w-6 h-6" />
                <span>End all games now and quit</span>
              </button>
            </li>
          </ul>
        </nav>
      </SlidePanel>
    </>
  );
};
