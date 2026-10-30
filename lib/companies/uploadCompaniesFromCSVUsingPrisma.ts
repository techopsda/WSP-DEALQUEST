import { PrismaClient } from '@prisma/client';
import _ from 'lodash';
import { CSVCompanyEarning } from './CSVCompanyEarning';
import { FormattedCSVCompany } from './FormattedCSVCompany';

export const uploadCompaniesFromCSVUsingPrisma = async (
  formattedCompanyObjects: (FormattedCSVCompany & { earnings: CSVCompanyEarning[] })[],
  prismaClient: PrismaClient
) => {
  const sectorsToSeed = _.uniqBy(
    _.map(formattedCompanyObjects, (company) => ({ name: company['Company Sector'] })),
    'name'
  );

  for (const sector of sectorsToSeed) {
    await prismaClient.sector.upsert({
      where: { name: sector.name },
      update: {},
      create: sector
    });
  }

  const sectors = await prismaClient.sector.findMany({
    where: { name: { in: sectorsToSeed.map((sector) => sector.name) } }
  });

  for (const companyObject of formattedCompanyObjects) {
    const sectorId = sectors.find((sector) => sector.name === companyObject['Company Sector'])?.id;
    if (!sectorId) throw new Error(`Could not find sector '${companyObject['Company Sector']}'`);

    const existingCompany = await prismaClient.company.findFirst({
      where: { name: companyObject['Company Name'], year: companyObject['Year'] }
    });
    if (existingCompany) continue;

    const newCompany = await prismaClient.company.create({
      data: {
        name: companyObject['Company Name'],
        reserve: companyObject['Reserve price'],
        risk: companyObject['Risk stars'],
        year: companyObject['Year'],
        salePrice: companyObject['Sale Price'],
        sectorId
      }
    });

    await prismaClient.earnings.createMany({
      data: companyObject.earnings.map((earning) => ({ ...earning, companyId: newCompany?.id }))
    });
  }
};
