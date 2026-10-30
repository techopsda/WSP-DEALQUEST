'use client';

import { Game, Member, TeamWithBalanceSheetData } from '@/types/database';
import clsx from 'clsx';
import _ from 'lodash';
import { Info, Trophy } from 'lucide-react';
import { Fragment } from 'react';
import { getNumberWithOrdinal } from './LeaderBoard/GetNumberWithOrdinal';
import { TeamMembersCard } from './LeaderBoard/TeamMembersCard';
import { toWords } from 'number-to-words';
import { RaceBy } from '@uiball/loaders';

interface GameLeaderboardProps {
  game: Game;
  teamsWithBalanceSheets: TeamWithBalanceSheetData[];
  currentTeamId: string;
  members?: Member[];
}

export const GameLeaderboard: React.FC<GameLeaderboardProps> = ({
  game,
  teamsWithBalanceSheets,
  currentTeamId,
  members
}) => {
  const groupedTeamBalanceSheets = _.groupBy(
    teamsWithBalanceSheets.map((teamBalanceSheet) => {
      return { ...teamBalanceSheet };
    }),
    'equity'
  );
  const groupedAndFilteredTeamBalanceSheets = _.orderBy(groupedTeamBalanceSheets, (item) => item[0]?.equity, 'desc');

  return (
    <div className="flex flex-col gap-6">
      {members && (
        <>
          {game.stage < 9 && (
            <p className="text-sm flex items-center gap-3">
              <Info className="w-6 h-6" strokeWidth={1} />
              Leaderboard as of the end of {game.year - 1 === 0 ? 'practice year' : `year ${toWords(game.year - 1)}`}
            </p>
          )}

          <hr className="border-0 border-b border-alpha" />
          <ol className="flex flex-col gap-6">
            {groupedAndFilteredTeamBalanceSheets.map((teamBalanceSheets, index) => (
              <Fragment key={index}>
                {teamBalanceSheets.map((teamBalanceSheet) => {
                  const teamMembers = members.filter((member) => member.teamId === teamBalanceSheet?.teamId);

                  return (
                    <Fragment key={teamBalanceSheet.teamId}>
                      <li className="flex flex-col gap-3">
                        <div className="flex flex-col gap-0.5">
                          <div className="text-sm flex items-center gap-1.5">
                            {index === 0 && <Trophy className="w-4 h-4 text-gold" strokeWidth={1} />}
                            <span className={clsx(index === 0 && 'text-gold')}>
                              {getNumberWithOrdinal(index + 1)} Place
                            </span>
                          </div>
                          <p
                            className={clsx(
                              'text-xl font-semibold',
                              currentTeamId === teamBalanceSheet.teamId ? 'text-bravo' : 'text-white'
                            )}
                          >
                            {teamBalanceSheet.Team.name}
                          </p>
                          <div className="text-sm" key={teamBalanceSheet.teamId}>
                            <TeamMembersCard members={teamMembers} />
                          </div>
                        </div>
                        <dl className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                          <div className="flex flex-col gap-1">
                            <dt className="text-xs uppercase text-alpha-light-900">Cash</dt>
                            <dd className="text-alpha-light">${teamBalanceSheet.cash}m</dd>
                          </div>
                          <div className="flex flex-col gap-1">
                            <dt className="text-xs uppercase text-alpha-light-900">Debt</dt>
                            <dd className="text-alpha-light">${teamBalanceSheet.debt}m</dd>
                          </div>
                          <div className="flex flex-col gap-1">
                            <dt className="text-xs uppercase text-alpha-light-900">Equity</dt>
                            <dd className="text-alpha-light">${teamBalanceSheet.equity}m</dd>
                          </div>
                        </dl>
                      </li>
                      {index !== teamBalanceSheets.length && (
                        <li>
                          <hr className="border-0 border-b border-alpha" />
                        </li>
                      )}
                    </Fragment>
                  );
                })}
              </Fragment>
            ))}
          </ol>
        </>
      )}
      {!members && (
        <div className="h-full w-full flex items-center justify-center">
          <RaceBy size={200} color="white" />
        </div>
      )}
    </div>
  );
};
