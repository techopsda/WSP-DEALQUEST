import { Member, Team } from '@/types/database';
import React from 'react';
import useIsInstructor from '../hooks/useInstructor';
import { TeamsSection } from './TeamsSection';

interface Props {
  teams: Team[];
  team?: Team;
  gameIds: (string | null)[];
  members: Member[];
}

export const LobbyMain: React.FC<Props> = ({ teams, team, gameIds, members }) => {
  const isInstructor = useIsInstructor();
  const teamsWithNoGame = teams.filter((team) => team.gameId === null);

  return (
    <div className="flex flex-col items-center gap-12">
      {gameIds.map((gameId, index) => {
        // Firstly display all the games sections (if any)
        if (isInstructor || gameId === team?.gameId) {
          const filteredTeams = teams.filter((team) => team.gameId === gameId);
          return (
            <React.Fragment key={gameId}>
              <span className="font-heading text-4xl font-semibold text-white">Game {index + 1}</span>
              <TeamsSection teams={filteredTeams} team={team} members={members} />
            </React.Fragment>
          );
        }
      })}
      {/* Then display the teams with no game allocated  */}
      {teamsWithNoGame.length > 0 && (isInstructor || !team?.gameId) && (
        <>
          {gameIds.length > 0 && (
            <span className="font-heading text-4xl font-semibold text-white">Awaiting Game Allocation</span>
          )}
          <TeamsSection teams={teamsWithNoGame} team={team} members={members} />
        </>
      )}
    </div>
  );
};
