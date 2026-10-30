import { PrismaClient } from '@prisma/client';

export const dropAndCreateInsertPolicy_Organisation = async (
  prismaClient: PrismaClient,
  schema: string,
  table: string,
  orgIdParam: string
) => {
  console.log(`Dropping insert policy for ${schema}.${table}...`);
  const dropSQL = `DROP POLICY IF EXISTS "DEFAULT_INSERT_POLICY" ON "${schema}"."${table}";`;
  const dropInsertPolicyResult = await prismaClient.$executeRawUnsafe(dropSQL);
  console.log(`...result was ${dropInsertPolicyResult}`);

  console.log(`Creating insert policy for ${schema}.${table}...`);
  const createSQL = `
    CREATE POLICY "DEFAULT_INSERT_POLICY"
    ON "${schema}"."${table}"
    FOR INSERT
    WITH CHECK (
      is_user_in_organisation('${orgIdParam}'::text)
    ); 
  `;
  const createInsertPolicyResult = await prismaClient.$executeRawUnsafe(createSQL);
  console.log(`...result was ${createInsertPolicyResult}`);
};
