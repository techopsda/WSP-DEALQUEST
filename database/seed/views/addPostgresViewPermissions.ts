import { PrismaClient } from '@prisma/client';

export const addPostgresViewPermissions = async (prismaClient: PrismaClient, table: string) => {
  console.log(`Adding permissions for ${table} view...`);
  const sql = `
      GRANT SELECT ON ${table}_random_view TO anon, authenticated, service_role;
    `;

  const grantViewPermissionsSql = await prismaClient.$executeRawUnsafe(sql);
  console.log(`...result was ${grantViewPermissionsSql}`);
};
