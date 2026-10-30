import _ from 'lodash';

export const getCompaniesNumberForCurrentYear = (gameYear: number, numberOfTeams: number) => {
  if (gameYear === 0 || gameYear >= 5) {
    return numberOfTeams;
  } else if (gameYear === 1 || gameYear === 4) {
    const num = Math.ceil(numberOfTeams + numberOfTeams * 0.4);
    return num;
  } else if (gameYear === 2) {
    return numberOfTeams * 2;
  } else if (gameYear === 3) {
    const num = Math.ceil(numberOfTeams - numberOfTeams * 0.4);
    return num;
  }
};
