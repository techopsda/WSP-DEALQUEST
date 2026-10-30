import { PrismaClient } from '@prisma/client';
import { addPostgresView } from './addPostgresView';
import { addPostgresViewPermissions } from './addPostgresViewPermissions';

const viewTables = ['Question', 'Company', 'LocalEvent'];

const seed = async (prismaClient: PrismaClient) => {
  console.log('Seeding postgres views...');
  for (const table of viewTables) {
    await addPostgresView(prismaClient, table);
    await addPostgresViewPermissions(prismaClient, table);
  }
};

export default seed;
