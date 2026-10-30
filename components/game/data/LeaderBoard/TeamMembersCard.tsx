import { getTeamMemberString } from '@/lib/team/getTeamMemberString';
import { Member } from '@/types/database';
import { Fragment } from 'react';

interface TeamMembersCardProps {
  members: Member[];
}

export const TeamMembersCard: React.FC<TeamMembersCardProps> = ({ members }) => {
  return (
    <Fragment>
      <p>{getTeamMemberString(members)}</p>
      &nbsp;
    </Fragment>
  );
};
