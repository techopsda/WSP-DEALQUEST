import { Team } from '@/types/database';

const generateRegistrationCode: (allTeams: Array<Team>) => string = (allTeams: Array<Team>) => {
  const generatedCode = Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, '0');

  if (allTeams.find((team) => team.registrationNumber === generatedCode)) {
    return generateRegistrationCode(allTeams);
  } else {
    return generatedCode;
  }
};

export default generateRegistrationCode;
