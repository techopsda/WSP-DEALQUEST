import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import GamePanelTableInformation from './GamePanelTable/GamePanelTableInformation';
import { TeamWithDashboardRelations } from '@/types/TournamentWithDashboardRelations';
import { Game, Tournament } from '@/types/database';
import { ChevronDown } from 'lucide-react';

interface IGamePanelHeader {
  expanded: number[];
  handleExpandDisclosure: (index: number) => void;
  index: number;
  game: Game;
  teams: TeamWithDashboardRelations[];
  tournament: Tournament;
}

const GamePanelHeader: React.FC<IGamePanelHeader> = ({
  expanded,
  handleExpandDisclosure,
  index,
  game,
  teams,
  tournament
}) => {
  return (
    <Disclosure.Button className="w-full p-6 flex flex-col gap-4" onClick={() => handleExpandDisclosure(index)}>
      <div className="w-full flex items-center justify-between gap-6">
        <p className="text-xl font-semibold">Game {index + 1}</p>
        <ChevronDown
          className={clsx(
            expanded.includes(index) ? '-rotate-180' : 'rotate-0',
            'text-alpha-light-900 h-6 w-6 duration-150'
          )}
          aria-hidden="true"
          strokeWidth={1}
        />
      </div>
      <hr className="w-full border-0 border-b border-alpha-light" />

      <GamePanelTableInformation teams={teams} game={game} tournament={tournament} />
    </Disclosure.Button>
  );
};

export default GamePanelHeader;
