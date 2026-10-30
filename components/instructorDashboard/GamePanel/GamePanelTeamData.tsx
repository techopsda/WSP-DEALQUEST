import { Game } from '@/types/database';
import { TeamWithDashboardRelations } from '@/types/TournamentWithDashboardRelations';
import { Disclosure } from '@headlessui/react';
import _ from 'lodash';
import GamePanelTable from './GamePanelTable/GamePanelTable';
import GamePanelTableInformation from './GamePanelTable/GamePanelTableInformation';

interface IGamePanelTable {
  game: Game;
  teams: TeamWithDashboardRelations[];
  connectedTeams: string[];
}

const GamePanelTeamData: React.FC<IGamePanelTable> = ({ game, teams, connectedTeams }) => {
  return (
    <Disclosure.Panel className="p-6" key={game.id} static>
      <GamePanelTable teams={teams} connectedTeams={connectedTeams} />
    </Disclosure.Panel>
  );
};

export default GamePanelTeamData;
