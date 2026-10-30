import { PrismaClient } from '@prisma/client';

export const dropAndCreateInsertPolicy_UserID = async (
  prismaClient: PrismaClient,
  schema: string,
  table: string,
  userIdColumn: string
) => {
  console.log(`Dropping insert policy for ${schema}.${table}...`);
  const dropSQL = `DROP POLICY IF EXISTS "DEFAULT_INSERT_POLICY" ON "${schema}"."${table}";`;
  const dropInsertPolicyResult = await prismaClient.$executeRawUnsafe(dropSQL);
  console.log(`...result was ${dropInsertPolicyResult}`);

  console.log(`Creating insert policy for ${schema}.${table}...`);
  const createSQL = `
    CREATE POLICY "DEFAULT_INSERT_POLICY"
      ON "${schema}"."${table}"
      FOR INSERT WITH CHECK (
        "${userIdColumn}" = auth.uid()
      );  
  `;
  const createInsertPolicyResult = await prismaClient.$executeRawUnsafe(createSQL);
  console.log(`...result was ${createInsertPolicyResult}`);
};
