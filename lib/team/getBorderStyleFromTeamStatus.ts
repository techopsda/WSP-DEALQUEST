export const getBorderStyleFromTeamStatus = (status: string) => {
  switch (status) {
    case 'active':
      return 'border-solid';
    case 'awaitingTeamName':
      return 'border-dashed';
    case 'awaitingTeamMembers':
      return 'border-dashed';
    case 'awaitingRegistrationCode':
      return 'border-dashed';
    default:
      return 'border-solid';
  }
};
