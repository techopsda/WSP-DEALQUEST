import { Member, Team, Tournament } from '@/types/database';
import _ from 'lodash';
import { InstructorGameScreenFooter } from '../game/InstructorGameScreenFooter';
import useIsInstructor from '../hooks/useInstructor';
import { LobbyFooter } from './LobbyFooter';
import { LobbyHeader } from './LobbyHeader';
import { LobbyMain } from './LobbyMain';
import LogoGroup from './LogoGroup';

interface Props {
  teams: Team[];
  team?: Team;
  tournament: Tournament;
  members: Member[];
}

export const LobbyRoom = ({ teams, tournament, team, members }: Props) => {
  const isInstructor = useIsInstructor();
  const teamsWithGame = teams.filter((team) => team.gameId !== null);
  const gameIds = _.uniq(teamsWithGame.map((team) => team.gameId));

  return (
    <div className="w-full flex flex-col gap-24 pb-36">
      <LogoGroup
        align={isInstructor ? 'items-start' : undefined}
        feHeight={isInstructor ? 'max-h-5' : undefined}
        dqHeight={isInstructor ? 'max-h-9' : undefined}
        gap={isInstructor ? 'gap-3' : undefined}
      />
      <div className="flex flex-col gap-[4.5rem]">
        <LobbyHeader tournament={tournament} team={team} />
        <LobbyMain team={team} teams={teams} gameIds={gameIds} members={members} />
      </div>
      {teamsWithGame.length < 1 || !isInstructor ? (
        <LobbyFooter teams={teams} tournament={tournament} />
      ) : (
        <InstructorGameScreenFooter games={gameIds} tournament={tournament} />
      )}
    </div>
  );
};
