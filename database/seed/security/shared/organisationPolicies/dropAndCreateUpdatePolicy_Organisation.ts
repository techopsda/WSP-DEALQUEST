import { PrismaClient } from '@prisma/client';

export const dropAndCreateUpdatePolicy_Organisation = async (
  prismaClient: PrismaClient,
  schema: string,
  table: string,
  orgIdParam: string
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
      is_user_in_organisation('${orgIdParam}'::text)
    ) WITH CHECK (
      is_user_in_organisation('${orgIdParam}'::text)
    ); 
  `;
  const createUpdatePolicyResult = await prismaClient.$executeRawUnsafe(createSQL);
  console.log(`...result was ${createUpdatePolicyResult}`);
};
