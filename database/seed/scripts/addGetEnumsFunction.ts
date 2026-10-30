import { PrismaClient } from '@prisma/client';

export const addGetEnumsFunction = async (prismaClient: PrismaClient) => {
  console.log('Creating get enums functions...');
  const sql = `
    CREATE OR REPLACE FUNCTION get_enums()
    RETURNS TABLE(enumlabel varchar, typname varchar, table_schema varchar, table_name varchar, column_name varchar)
    AS $$
    BEGIN
        RETURN QUERY 
        SELECT e.enumlabel::VARCHAR, t.typname::VARCHAR, i.table_schema::VARCHAR, i.table_name::VARCHAR, i.column_name::VARCHAR
        FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        JOIN information_schema.columns i ON i.udt_name = t.typname
        WHERE i.table_schema NOT LIKE 'pg%'
        AND i.table_schema NOT LIKE 'graphql%'
        AND i.table_schema != 'information_schema'
        AND i.table_schema != 'extensions'
        AND i.table_schema != 'storage'
        AND i.table_schema != 'cron'
        AND i.table_schema != 'auth'
        AND i.table_schema != 'realtime';
    END;
    $$ language plpgsql;
  `;
  const creatingGetEnumsFunctionsSql = await prismaClient.$executeRawUnsafe(sql);
  console.log(`...result was ${creatingGetEnumsFunctionsSql}`);
};
