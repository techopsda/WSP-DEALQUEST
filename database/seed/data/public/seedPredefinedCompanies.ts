import Papa from 'papaparse';
import { PrismaClient } from '@prisma/client';
import { Companies } from './DealQuestCompanies';
import _, { isNaN } from 'lodash';
import { CSVCompany } from '@/lib/companies/CSVCompany';
import { CSVCompanyEarning } from '@/lib/companies/CSVCompanyEarning';
import { FormattedCSVCompany } from '@/lib/companies/FormattedCSVCompany';
import { uploadCompaniesFromCSVUsingPrisma } from '@/lib/companies/uploadCompaniesFromCSVUsingPrisma';

export const seedPredefinedCompanies = async (prismaClient: PrismaClient) => {
  console.log('Seeding predefined companies, earnings and sectors...');

  const transformValue = (value: string) => {
    if (value === 'null' || !value || value === ' ') return null;
    else if (value === 'true') return true;
    else if (value === 'false') return false;
    else return value.trim();
  };

  const transformHeader = (value: string) => {
    return value.trim();
  };

  const options = {
    header: true,
    skipEmptyLines: true,
    transform: (value: string) => transformValue(value),
    transformHeader: (value: string) => transformHeader(value)
  };

  const { data: csvCompanies } = Papa.parse(Companies, options);

  const formattedCsvCompanies = (csvCompanies as CSVCompany[])?.map((companyObject) => {
    let formattedCompanyObject: FormattedCSVCompany | CSVCompany = companyObject;
    const earnings: CSVCompanyEarning[] = [];

    Object.entries(companyObject).map(([key, value], index) => {
      if (key.startsWith('Y') && index !== 0) {
        if (value && !isNaN(parseFloat(value)))
          earnings.push({
            year: parseInt(key.replace('Y', '')),
            amount: parseFloat(value)
          });

        formattedCompanyObject = _.omit(formattedCompanyObject, key) as FormattedCSVCompany;
        return;
      }

      if (index > 2 || index === 0) {
        _.set(formattedCompanyObject, key, value ? parseFloat(value) : null);
        return;
      }

      _.set(formattedCompanyObject, key, value);
    });

    return { ...(formattedCompanyObject as unknown as FormattedCSVCompany), earnings };
  });

  await uploadCompaniesFromCSVUsingPrisma(formattedCsvCompanies, prismaClient);
};
