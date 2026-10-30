import { PrismaClient } from '@prisma/client';

export const seedReplication = async (tables: string[], prismaClient: PrismaClient) => {
  const tableString = tables.map((table) => `"${table}"`).join(', ');
  console.log(`Seeding replication for tables ${tableString}...`);

  const sql = `
    alter publication supabase_realtime
    add table ${tableString};
  `;

  const replicationSql = await prismaClient.$executeRawUnsafe(sql);
  console.log(`...result was ${replicationSql}`);
};
