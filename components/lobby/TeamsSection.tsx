import { Member, Team } from '@/types/database';
import { TeamCard } from './TeamCard';

interface Props {
  teams: Team[];
  team?: Team;
  members: Member[];
}

export const TeamsSection: React.FC<Props> = ({ teams, team, members }) => {
  return (
    <div className="grid grid-cols-3 gap-6 w-full max-w-8xl">
      {teams.map((teamItem) => {
        const teamMembers = members.filter((member) => member.teamId === teamItem?.id);

        return (
          <TeamCard teamMembers={teamMembers} key={teamItem.id} team={teamItem} isUser={team?.id === teamItem.id} />
        );
      })}
    </div>
  );
};
