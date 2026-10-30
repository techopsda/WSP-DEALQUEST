import { Member } from '@/types/database';

export const getTeamMemberString = (teamMembers: Member[]) => {
  if (teamMembers?.length === 0) {
    return 'Currently interviewing for roles';
  } else {
    if (teamMembers?.length === 1) {
      return teamMembers[0].name;
    } else {
      const teamMemberNames = teamMembers?.map((member) => member?.name);
      return `${teamMemberNames?.slice(0, -1).join(', ')} & ${teamMemberNames?.slice(-1)}`;
    }
  }
};
