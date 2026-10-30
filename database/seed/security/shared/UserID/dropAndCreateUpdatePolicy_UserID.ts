import { PrismaClient } from '@prisma/client';

export const dropAndCreateUpdatePolicy_UserID = async (
  prismaClient: PrismaClient,
  schema: string,
  table: string,
  userIdColumn: string
) => {
  console.log(`Dropping update policy for ${schema}.${table}...`);
  const dropSQL = `DROP POLICY IF EXISTS "DEFAULT_UPDATE_POLICY" ON "${schema}"."${table}";`;
  const dropUpdatePolicyResult = await prismaClient.$executeRawUnsafe(dropSQL);
  console.log(`...result was ${dropUpdatePolicyResult}`);

  console.log(`Creating update policy for ${schema}.${table}...`);
  const createSQL = `
    CREATE POLICY "DEFAULT_UPDATE_POLICY"
      ON "${schema}"."${table}"
      FOR UPDATE USING (
        "${userIdColumn}" = auth.uid()
      )
      WITH CHECK (
        "${userIdColumn}" = auth.uid()
      );  
  `;
  const createUpdatePolicyResult = await prismaClient.$executeRawUnsafe(createSQL);
  console.log(`...result was ${createUpdatePolicyResult}`);
};
