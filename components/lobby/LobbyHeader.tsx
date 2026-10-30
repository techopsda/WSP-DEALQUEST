import { Team, Tournament } from '@/types/database';
import useIsInstructor from '../hooks/useInstructor';
import InstructorLobbyHeader from './InstructorLobbyHeader';
import TeamLobbyHeader from './TeamLobbyHeader';

interface Props {
  tournament: Tournament;
  team?: Team;
}

export const LobbyHeader: React.FC<Props> = ({ tournament, team }) => {
  const isInstructor = useIsInstructor();

  return (
    <header className="flex flex-col items-center justify-center gap-4 text-center">
      {isInstructor && <InstructorLobbyHeader lobbyCode={tournament.lobbyCode} />}
      {team && !isInstructor && <TeamLobbyHeader team={team} tournament={tournament} />}
    </header>
  );
};
