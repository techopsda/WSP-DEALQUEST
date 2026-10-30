import { getOrdinal } from '@/lib/shared/getOrdinal';
import { getTeamMemberString } from '@/lib/team/getTeamMemberString';
import clsx from 'clsx';
import { Crown, Medal, Trophy } from 'lucide-react';
import { TeamWithBalanceSheetDataAndMembers } from '../yearEnd/useBalanceSheetAndCompanies';

interface LeaderboardTeamProps {
  teamBalanceSheet: TeamWithBalanceSheetDataAndMembers;
  place: number;
  teamIsUser: boolean;
  numberOfCompanies: number;
}

export const LeaderboardTeam: React.FC<LeaderboardTeamProps> = ({
  teamBalanceSheet,
  place,
  teamIsUser,
  numberOfCompanies
}) => {
  return (
    <div
      className={clsx(
        'w-full bg-alpha-800 rounded-xl overflow-hidden',
        (place === 1 || place === 2 || place === 3) && 'border-2',
        place === 1 ? 'border-gold' : place === 2 ? 'border-silver' : 'border-bronze'
      )}
    >
      <div
        className={clsx(
          'bg-alpha-950 px-6 py-3 flex items-center gap-3',
          place === 1 ? 'text-gold' : place === 2 ? 'text-silver' : place === 3 ? 'text-bronze' : 'text-alpha-light-800'
        )}
      >
        {place === 1 ? (
          <Trophy className="w-6 h-6" strokeWidth={1} />
        ) : (
          (place === 2 || place === 3) && <Medal className="w-6 h-6" strokeWidth={1} />
        )}
        <p>
          {place}
          {getOrdinal(place)} Place
        </p>
      </div>
      <div className="p-6 flex flex-col gap-6">
        <div>
          <p
            className={clsx('font-semibold text-xl flex items-center gap-3', teamIsUser ? 'text-bravo' : 'text-white')}
          >
            {teamIsUser && <Crown className="w-6 h-6" />}
            {teamBalanceSheet.Team.name}
          </p>
          {/* <p>{getTeamMemberString()}</p> */}
          {/* This should use the getTeamMemberString fuction above and pass in the array of team members */}
          <p className={clsx(teamIsUser && 'text-bravo')}>{getTeamMemberString(teamBalanceSheet.Team.Member)}</p>
        </div>
        <dl className="grid grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex flex-col gap-1">
            <dt className="text-sm uppercase text-alpha-light-900">Cash</dt>
            <dd className="text-alpha-light text-lg font-medium">${teamBalanceSheet.cash}m</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm uppercase text-alpha-light-900">Debt</dt>
            <dd className="text-alpha-light text-lg font-medium">${teamBalanceSheet.debt}m</dd>
          </div>
          <div id={`teamEquity${place}`} className="flex flex-col gap-1">
            <dt className="text-sm uppercase text-alpha-light-900">Equity</dt>
            <dd className="text-alpha-light text-lg font-medium">${teamBalanceSheet.equity}m</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm uppercase text-alpha-light-900">Companies</dt>
            <dd className="text-alpha-light text-lg font-medium">{numberOfCompanies}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
