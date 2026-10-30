import { PrismaClient } from '@prisma/client';
import { dropAndCreateDeletePolicy } from '../shared/defaultPolicies/dropAndCreateDeletePolicy';
import { dropAndCreateInsertPolicy } from '../shared/defaultPolicies/dropAndCreateInsertPolicy';
import { dropAndCreateSelectPolicy } from '../shared/defaultPolicies/dropAndCreateSelectPolicy';
import { dropAndCreateUpdatePolicy } from '../shared/defaultPolicies/dropAndCreateUpdatePolicy';
import { enableRLS } from '../shared/enableRLS';

const tables = [
  'AccountsSheet',
  'Answer',
  'Auction',
  'BalanceSheet',
  'Bid',
  'Company',
  'Earnings',
  'Finance',
  'Game',
  'GlobalEvent',
  'JobTitle',
  'LocalEvent',
  'Member',
  'Notification',
  'Period',
  'Question',
  'Sector',
  'Setting',
  'Team',
  'TeamCompany',
  'TeamLocalEvent',
  'TeamQuestion',
  'Tournament'
];

export const seedPublic = async (prismaClient: PrismaClient) => {
  console.log("Seeding security for schema 'Public'...");

  for (const table of tables) {
    await enableRLS(prismaClient, 'public', table);
    await dropAndCreateSelectPolicy(prismaClient, 'public', table);
    await dropAndCreateInsertPolicy(prismaClient, 'public', table);
    await dropAndCreateUpdatePolicy(prismaClient, 'public', table);
    await dropAndCreateDeletePolicy(prismaClient, 'public', table);
  }
};
