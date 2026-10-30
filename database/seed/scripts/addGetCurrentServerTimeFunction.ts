import { PrismaClient } from '@prisma/client';

export const addGetCurrentServerTimeFunction = async (prismaClient: PrismaClient) => {
  console.log('Adding get current server time functions...');

  const sql = `
    CREATE OR REPLACE FUNCTION get_current_server_time()
    RETURNS timestamp
    as $$
        SELECT NOW();
    $$ language sql;
  `;

  const getCurrentServerTimeFunctionResult = await prismaClient.$executeRawUnsafe(sql);
  console.log(`...result was ${getCurrentServerTimeFunctionResult}`);
};
