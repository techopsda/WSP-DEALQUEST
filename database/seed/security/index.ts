import { PrismaClient } from '@prisma/client';
import { seedAccess } from './access';
import { seedPublic } from './public';
import { grantSchemaPermissions } from './schemas';

const seed = async (prismaClient: PrismaClient) => {
  console.log('Seeding security...');
  await grantSchemaPermissions(prismaClient);
  await seedAccess(prismaClient);
  await seedPublic(prismaClient);
};

export default seed;
