import { TeamCompany } from '@/types/database';
import _ from 'lodash';
import { CompanyWithSectorAndEarnings } from '../shared/companyAccordion/ExtendedCompanyType';

export const getCompaniesToDisplay = (companiesObject?: {
  companies: CompanyWithSectorAndEarnings[];
  teamCompanies?: TeamCompany[];
}) => {
  const companies = companiesObject?.companies;

  if (companiesObject?.teamCompanies) {
    const teamCompanies = companiesObject?.teamCompanies;

    return (
      companies?.filter((company) =>
        teamCompanies.some((teamCompany) => teamCompany.companyId === company?.Company?.id)
      ) ?? []
    );
  } else {
    return companies ?? [];
  }
};
