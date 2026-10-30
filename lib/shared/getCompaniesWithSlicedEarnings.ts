import { CompanyWithSectorAndEarnings } from '@/components/game/shared/companyAccordion/ExtendedCompanyType';
import _ from 'lodash';

export const getCompaniesWithSlicedEarnings = (
  companiesToDisplay: CompanyWithSectorAndEarnings[],
  gameYear: number
): CompanyWithSectorAndEarnings[] => {
  const firstEarning = companiesToDisplay[0]?.Company?.Earnings?.findIndex((earning) => earning.year === gameYear - 3);

  return companiesToDisplay?.map((companyToDisplay) => {
    const company = companyToDisplay?.Company;

    return {
      ...companyToDisplay,
      Company: {
        ...company,
        Earnings: company?.Earnings.slice(firstEarning, (firstEarning ?? 0) + 7)
      }
    };
  }) as CompanyWithSectorAndEarnings[];
};
