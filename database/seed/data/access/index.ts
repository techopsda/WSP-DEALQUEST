import { PrismaClient } from '@prisma/client';
import { deleteAuthUsers } from './deleteAuthUsers';
import { backfillAuthUsers } from './backfillAuthUsers';
import { seedRolesPermissions } from './seedRolesPermissions';
import { seedUserOrganisationRoles } from './seedUserOrganisationRoles';
import { seedUsers } from './seedUsers';

const seedAccess = async (prismaClient: PrismaClient) => {
  console.log("Seeding data for schema 'Access'...");
  await deleteAuthUsers(prismaClient);
  await seedRolesPermissions(prismaClient);
  if (process.env.SEED_TEST_USERS === 'true') {
    await seedUsers(prismaClient);
  } else {
    console.log('Skipping hard-coded test users. Set SEED_TEST_USERS=true to create them.');
  }
  await backfillAuthUsers(prismaClient);
  await seedUserOrganisationRoles(prismaClient);
};

export default seedAccess;
