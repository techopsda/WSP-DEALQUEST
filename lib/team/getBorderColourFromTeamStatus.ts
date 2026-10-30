export const getBorderColourFromTeamStatus = (status: string, isUser: boolean) => {
  switch (status) {
    case 'active':
      if (isUser) return 'border-bravo';
      return 'border-alpha-light-800';
    case 'awaitingTeamName':
      return 'border-alpha-highlight-light';
    case 'awaitingTeamMembers':
      return 'border-alpha-highlight-light';
    case 'awaitingRegistrationCode':
      return 'border-alpha-highlight-light';
    default:
      return 'border-alpha-light-800';
  }
};
