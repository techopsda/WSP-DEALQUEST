export const getTextColourFromTeamStatus = (status: string, isUser: boolean) => {
  switch (status) {
    case 'active':
      if (isUser) return 'text-bravo';
      return 'text-alpha-light-800';
    case 'awaitingTeamName':
      return 'text-alpha-highlight-light';
    case 'awaitingTeamMembers':
      return 'text-alpha-highlight-light';
    case 'awaitingRegistrationCode':
      return 'text-alpha-highlight-light';
    default:
      return 'text-alpha-light-800';
  }
};
