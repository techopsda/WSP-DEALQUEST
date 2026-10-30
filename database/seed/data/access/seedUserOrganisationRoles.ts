import { PrismaClient } from '@prisma/client';
import { upgradeUsers } from './upgradeUsers';

export const seedUserOrganisationRoles = async (prismaClient: PrismaClient) => {
  console.log('Seeding user organisation roles...');

  console.log('Upgrading super admins');
  await upgradeUsers(prismaClient, '+superadmin@', 'SuperAdmin');

  console.log('Upgrading admins');
  await upgradeUsers(prismaClient, '+admin@', 'Admin');
};
