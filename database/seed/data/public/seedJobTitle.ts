import type { PrismaClient } from '@prisma/client';

export const seedJobTitles = async (prismaClient: PrismaClient) => {
  console.log('Seeding job titles...');

  const jobTitles = [
    { name: 'Chief Executive Officer' },
    { name: 'Chief Financial Officer' },
    { name: 'Chief Operating Officer' },
    { name: 'Chief Marketing Officer' },
    { name: 'Chief Technology Officer' },
    { name: 'Chief HR Officer' },
    { name: 'Chief Compliance Officer' },
    { name: 'Assistant to the Regional Manager' }
  ];

  for (const jobTitle of jobTitles) {
    const existing = await prismaClient.jobTitle.findFirst({ where: { name: jobTitle.name } });
    if (!existing) await prismaClient.jobTitle.create({ data: jobTitle });
  }
};
