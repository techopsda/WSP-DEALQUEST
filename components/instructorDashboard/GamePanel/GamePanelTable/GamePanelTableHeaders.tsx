import { TeamWithDashboardRelations } from '@/types/TournamentWithDashboardRelations';
import { flexRender, HeaderGroup } from '@tanstack/react-table';

interface IGamePanelTableHeaders {
  getHeaderGroups: () => HeaderGroup<TeamWithDashboardRelations>[];
}

const GamePanelTableHeaders: React.FC<IGamePanelTableHeaders> = ({ getHeaderGroups }) => {
  return (
    <thead className="bg-gray-100 rounded-md">
      {getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={`py-2 px-6 text-left text-sm tracking-wider text-white bg-alpha ${
                  header.column.id === 'select' ? 'min-w-10' : ''
                }`}
              >
                <div
                  data-id={header.column.id}
                  className="flex items-center justify-between"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default GamePanelTableHeaders;
