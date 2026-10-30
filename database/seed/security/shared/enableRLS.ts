import { PrismaClient } from '@prisma/client';

export const enableRLS = async (prismaClient: PrismaClient, schema: string, table: string) => {
  const sql = `ALTER TABLE "${schema}"."${table}" ENABLE ROW LEVEL SECURITY;`;
  console.log(sql);
  const enableRLSResult = await prismaClient.$executeRawUnsafe(sql);
  console.log(`...result was ${enableRLSResult}`);
};
