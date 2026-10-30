import { PrismaClient } from '@prisma/client';

export const dropAndCreateDeletePolicy_Organisation = async (
  prismaClient: PrismaClient,
  schema: string,
  table: string,
  orgIdParam: string
) => {
  console.log(`Dropping delete policy for ${schema}.${table}...`);
  const dropSQL = `DROP POLICY IF EXISTS "DEFAULT_DELETE_POLICY" ON "${schema}"."${table}";`;
  const dropDeletePolicyResult = await prismaClient.$executeRawUnsafe(dropSQL);
  console.log(`...result was ${dropDeletePolicyResult}`);

  console.log(`Creating delete policy for ${schema}.${table}...`);
  const createSQL = `
    CREATE POLICY "DEFAULT_DELETE_POLICY"
    ON "${schema}"."${table}"
    FOR DELETE USING (
      is_user_in_organisation('${orgIdParam}'::text)
    ); 
  `;
  const createDeletePolicyResult = await prismaClient.$executeRawUnsafe(createSQL);
  console.log(`...result was ${createDeletePolicyResult}`);
};
