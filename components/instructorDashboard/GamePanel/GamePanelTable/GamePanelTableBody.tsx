import { TeamWithDashboardRelations } from '@/types/TournamentWithDashboardRelations';
import { flexRender } from '@tanstack/react-table';
import { RowModel } from '@tanstack/table-core';

interface IGamePanelTableBody {
  getRowModel: () => RowModel<TeamWithDashboardRelations>;
}

const GamePanelTableBody: React.FC<IGamePanelTableBody> = ({ getRowModel }) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white items-start h-full w-full">
      {getRowModel().rows.map((row) => (
        <tr key={row.id} className={`bg-opacity-20 h-full w-full`}>
          {row.getAllCells().map((cell) => {
            return (
              <td
                key={cell.id}
                className={`relative whitespace-nowrap text-sm font-medium text-gray-900 h-full ${
                  cell.column.id === 'select' ? 'w-10' : ''
                } px-4`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default GamePanelTableBody;
