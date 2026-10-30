import { PrismaClient } from '@prisma/client';
import _ from 'lodash';
import { seedGlobalEvents } from './seedGlobalEvents';
import { seedJobTitles } from './seedJobTitle';
import { seedLocalEvents } from './seedLocalEvents';
import { seedPredefinedCompanies } from './seedPredefinedCompanies';
import { seedPredefinedQuestions } from './seedPredefinedQuestions';
import { seedSettings } from './seedSettings';

const seedPublic = async (prismaClient: PrismaClient) => {
  console.log("Seeding data for schema 'Public'...");

  await seedSettings(prismaClient);

  await seedJobTitles(prismaClient);
  await seedLocalEvents(prismaClient);
  await seedGlobalEvents(prismaClient);

  await seedPredefinedCompanies(prismaClient);
  await seedPredefinedQuestions(prismaClient);
};

export default seedPublic;
