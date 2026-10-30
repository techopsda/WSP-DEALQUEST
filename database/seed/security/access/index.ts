import { PrismaClient } from '@prisma/client';
import { dropAndCreateDeletePolicy } from '../shared/defaultPolicies/dropAndCreateDeletePolicy';
import { dropAndCreateInsertPolicy } from '../shared/defaultPolicies/dropAndCreateInsertPolicy';
import { dropAndCreateSelectPolicy } from '../shared/defaultPolicies/dropAndCreateSelectPolicy';
import { dropAndCreateUpdatePolicy } from '../shared/defaultPolicies/dropAndCreateUpdatePolicy';
import { enableRLS } from '../shared/enableRLS';

const tables = [
  'Organisation',
  'Permission',
  'Role',
  'RolePermission',
  'User',
  'UserOrganisation',
  'UserOrganisationRole',
  'UserRole'
];

export const seedAccess = async (prismaClient: PrismaClient) => {
  console.log("Seeding security for schema 'Access'...");

  for (const table of tables) {
    await enableRLS(prismaClient, 'access', table);
    await dropAndCreateSelectPolicy(prismaClient, 'access', table);
    await dropAndCreateInsertPolicy(prismaClient, 'access', table);
    await dropAndCreateUpdatePolicy(prismaClient, 'access', table);
    await dropAndCreateDeletePolicy(prismaClient, 'access', table);
  }
};
