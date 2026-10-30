import { Team, Tournament } from '@/types/database';

interface TeamLobbyHeaderProps {
  team: Team;
  tournament: Tournament;
}

const TeamLobbyHeader: React.FC<TeamLobbyHeaderProps> = ({ team, tournament }) => {
  return (
    <>
      <h1 className="text-white font-heading leading-snug text-5xl">
        <span className="">
          Welcome <span className="text-bravo mr-2">{team.name}</span>
        </span>
        <span className="text-white">to {tournament?.instructorName?.split(' ')[0] ?? 'The Instructor'}'s Lobby</span>
      </h1>
      <p className="text-xl">You will soon be added to a game, please wait while all teams file their paperwork</p>
    </>
  );
};

export default TeamLobbyHeader;
