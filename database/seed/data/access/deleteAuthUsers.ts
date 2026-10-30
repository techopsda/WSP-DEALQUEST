import { PrismaClient } from '@prisma/client';

const DELETE_AUTH_USERS_SQL = `
DELETE FROM "auth"."users" WHERE "id" NOT IN (SELECT owner FROM "storage"."objects" WHERE owner IS NOT NULL)
`;

export const deleteAuthUsers = async (prismaClient: PrismaClient) => {
  if (process.env.ALLOW_DESTRUCTIVE_AUTH_SEED !== 'true') {
    console.log('Skipping Auth user deletion. Set ALLOW_DESTRUCTIVE_AUTH_SEED=true to enable it.');
    return;
  }

  console.log('Deleting auth users...');
  const deleteAuthUsersResult = await prismaClient.$executeRawUnsafe(DELETE_AUTH_USERS_SQL);
  console.log(`...result was ${deleteAuthUsersResult}`);
};
