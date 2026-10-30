import { getBorderColourFromTeamStatus } from '@/lib/team/getBorderColourFromTeamStatus';
import { getBorderStyleFromTeamStatus } from '@/lib/team/getBorderStyleFromTeamStatus';
import { getTeamMemberString } from '@/lib/team/getTeamMemberString';
import { getTextColourFromTeamStatus } from '@/lib/team/getTextColourFromTeamStatus';
import { Member, Team } from '@/types/database';
import clsx from 'clsx';
import { Crown } from 'lucide-react';

interface Props {
  team: Team;
  borderColor?: string;
  textColor?: string;
  isUser: boolean;
  teamMembers: Member[];
}

export const TeamCard: React.FC<Props> = ({
  team,
  isUser,
  borderColor = getBorderColourFromTeamStatus('active', isUser),
  textColor = getTextColourFromTeamStatus('active', isUser),
  teamMembers
}) => {
  const borderStyle = getBorderStyleFromTeamStatus(team.status);
  return (
    <div className={`border-2 ${borderColor} ${borderStyle} ${textColor} p-6 rounded-lg`} key={team.id}>
      <div className="relative flex gap-3 items-start">
        {isUser && <Crown className="shrink-0 h-6 w-6 translate-y-1.5 text-bravo" />}
        <p className={clsx('text-2xl font-semibold', isUser && 'text-bravo')}>{team.name}</p>
      </div>
      <p className="text-lg">{getTeamMemberString(teamMembers)}</p>
    </div>
  );
};
