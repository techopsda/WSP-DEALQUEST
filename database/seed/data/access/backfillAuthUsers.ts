import { PrismaClient } from '@prisma/client';

const BACKFILL_AUTH_USERS_SQL = `
  INSERT INTO access."User" ("id", "email", "firstName", "lastName", "metadata")
  SELECT
    auth_user.id,
    auth_user.email,
    COALESCE(
      auth_user.raw_user_meta_data ->> 'northStarFirstName',
      substring(auth_user.raw_user_meta_data ->> 'name' from '^[^ ]+')
    ),
    COALESCE(
      auth_user.raw_user_meta_data ->> 'northStarLastName',
      substring(auth_user.raw_user_meta_data ->> 'name' from '[^ ]+$')
    ),
    auth_user.raw_user_meta_data
  FROM auth.users auth_user
  WHERE auth_user.email IS NOT NULL
  ON CONFLICT ("id") DO UPDATE
  SET
    "email" = EXCLUDED."email",
    "firstName" = COALESCE(access."User"."firstName", EXCLUDED."firstName"),
    "lastName" = COALESCE(access."User"."lastName", EXCLUDED."lastName"),
    "metadata" = EXCLUDED."metadata";
`;

export const backfillAuthUsers = async (prismaClient: PrismaClient) => {
  console.log('Synchronizing existing Auth users into access.User...');
  const result = await prismaClient.$executeRawUnsafe(BACKFILL_AUTH_USERS_SQL);
  console.log(`...synchronized ${result} Auth user(s)`);
};
