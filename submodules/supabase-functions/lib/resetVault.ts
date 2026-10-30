import { PrismaClient } from '@prisma/client';

export const resetVault = async (prismaClient: PrismaClient) => {
  const resetVaultSql = 'delete from vault.decrypted_secrets;';

  console.log('Resetting vault secrets...');
  const resetVaultSqlResult = await prismaClient.$executeRawUnsafe(resetVaultSql);
  console.log(`...result was ${resetVaultSqlResult}`);
};
