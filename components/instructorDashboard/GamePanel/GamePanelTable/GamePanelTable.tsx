import { TeamWithDashboardRelations } from '@/types/TournamentWithDashboardRelations';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import _ from 'lodash';
import GamePanelTableBody from './GamePanelTableBody';
import GamePanelTableHeaders from './GamePanelTableHeaders';
import createGamePanelColumns from './util/createGamePanelColumns';

interface IGamePanelTable {
  teams: TeamWithDashboardRelations[];
  connectedTeams: string[];
}

const GamePanelTable: React.FC<IGamePanelTable> = ({ teams, connectedTeams }) => {
  const { getHeaderGroups, getRowModel } = useReactTable({
    columns: createGamePanelColumns({ teams, connectedTeams }),
    data: teams,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="overflow-x-scroll w-full">
      <table className="min-w-full divide-y divide-gray-200 border h-full rounded-lg">
        <GamePanelTableHeaders getHeaderGroups={getHeaderGroups} />
        <GamePanelTableBody getRowModel={getRowModel} />
      </table>
    </div>
  );
};

export default GamePanelTable;
