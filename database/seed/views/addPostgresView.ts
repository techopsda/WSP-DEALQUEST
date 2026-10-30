import { PrismaClient } from '@prisma/client';

export const addPostgresView = async (prismaClient: PrismaClient, table: string) => {
  console.log(`Creating random table view for table ${table}`);
  const sql = `
        CREATE OR REPLACE VIEW ${table}_random_view WITH (security_invoker = on) AS SELECT * FROM "${table}" ORDER BY RANDOM();
    `;

  const createViewSql = await prismaClient.$executeRawUnsafe(sql);
  console.log(`...result was ${createViewSql}`);
};
