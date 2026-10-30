import _ from 'lodash';
import { Fragment } from 'react';
import { LeaderboardTeam } from '../game/leaderboard/LeadboardTeam';
import { TeamWithBalanceSheetDataAndMembers } from '../game/yearEnd/useBalanceSheetAndCompanies';

export interface LeaderboardProps {
  title?: string;
  titleSize?: string;
  teamBalanceSheets: TeamWithBalanceSheetDataAndMembers[];
  teamId: string;
}

// Team prop should probably be game teams

export const Leaderboard: React.FC<LeaderboardProps> = ({
  title = 'Leaderboard',
  titleSize = 'text-4xl',
  teamBalanceSheets,
  teamId
}) => {
  const groupedTeamBalanceSheets = _.groupBy(
    teamBalanceSheets.map((teamBalanceSheet) => {
      return { ...teamBalanceSheet };
    }),
    'equity'
  );
  const groupedAndFilteredTeamBalanceSheets = _.orderBy(groupedTeamBalanceSheets, (item) => item[0]?.equity, 'desc');

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
      <h1 className={`${titleSize} font-heading font-bold text-white`}>{title}</h1>
      {/* Should map over the teams in the game in order */}
      {groupedAndFilteredTeamBalanceSheets.map((teamsBalanceSheets, index) => (
        <Fragment key={index}>
          {teamsBalanceSheets.map((teamBalanceSheet) => (
            <LeaderboardTeam
              teamBalanceSheet={teamBalanceSheet}
              place={index + 1}
              teamIsUser={teamBalanceSheet.teamId === teamId}
              numberOfCompanies={teamBalanceSheet.Team.TeamCompany.length}
              key={teamBalanceSheet.id}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default Leaderboard;
