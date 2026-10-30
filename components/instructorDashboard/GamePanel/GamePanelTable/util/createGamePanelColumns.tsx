import { TeamWithDashboardRelations } from '@/types/TournamentWithDashboardRelations';
import { ColumnDef } from '@tanstack/table-core';
import _ from 'lodash';
import { Wifi, WifiOff } from 'lucide-react';
import { useMemo } from 'react';
import getRiskRating from './getRiskRating';

interface createGamePanelColumnsProps {
  teams: TeamWithDashboardRelations[];
  connectedTeams: string[];
}

const createGamePanelColumns: ({
  teams,
  connectedTeams
}: createGamePanelColumnsProps) => ColumnDef<TeamWithDashboardRelations>[] = ({ teams, connectedTeams }) => {
  const allMembers = _.groupBy(
    teams.flatMap((team) => team.Member),
    'teamId'
  );

  const allCompanies = _.groupBy(
    teams.flatMap((team) =>
      team.TeamCompany.flatMap((teamCompany) => {
        return { ...teamCompany.Company, teamId: teamCompany.teamId };
      })
    ),
    'teamId'
  );

  return useMemo(() => {
    return [
      {
        header: 'Team',
        cell: ({ row }) => {
          const members = allMembers?.[row.original.id] ?? [];

          return (
            <div className="flex p-2 items-center gap-2" key={row.id}>
              {!connectedTeams.find((teamId) => row.original.id === teamId) ? (
                <WifiOff className="h-6 w-6 text-[#B33030]" />
              ) : (
                <Wifi className="h-6 w-6 text-green-600" />
              )}
              <div className="flex flex-col">
                <span className="text-md font-semibold">{row.original.name ?? '-'}</span>
                <span className="text-sm text-gray-600">{members.map((member) => member?.name).join(', ')}</span>
              </div>
            </div>
          );
        }
      },
      {
        header: 'Companies: Total Value',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col p-2">
              <span className="text-md">{row.original.TeamCompany.length ?? 0}</span>
            </div>
          );
        }
      },
      {
        header: 'Equity',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col p-2">
              <span className="text-md">{row.original.BalanceSheet[0]?.equity ?? 0}</span>
            </div>
          );
        }
      },
      {
        header: 'Debt',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col p-2">
              <span className="text-md">{row.original.BalanceSheet[0]?.debt ?? 0}</span>
            </div>
          );
        }
      },
      {
        header: 'Total Risk',
        cell: ({ row }) => {
          const companies = allCompanies?.[row?.original?.id] ?? [];
          const averageRisk = _.mean(_.map(companies, 'risk'));
          const averageRiskWholeNumber = _.round(averageRisk);

          return <div className="p-2 flex">{getRiskRating(averageRiskWholeNumber, 5)}</div>;
        }
      }
    ];
  }, [teams, allMembers, allCompanies, connectedTeams]);
};

export default createGamePanelColumns;
