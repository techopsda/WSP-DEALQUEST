import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { hasAdminAccess } from '@/lib/auth/hasAdminAccess';
import { createBypassSession, isAuthBypassEnabled } from '@/lib/auth/authBypass';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const isMissingSchemaDataFunctionError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes('get_schema_data') && message.includes('does not exist');
};

const getAdminResourcesErrorMessage = (error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unable to discover Supabase resources.';

  if (message.includes('@prisma/client did not initialize yet')) {
    return 'Prisma Client is not initialized. Ensure production dependencies are installed correctly and Prisma Client was generated before starting the app.';
  }

  if (message.includes('Can\'t reach database server') || message.includes('Authentication failed')) {
    return `Prisma database connection failed: ${message}`;
  }

  return message;
};

export async function GET() {
  const supabase = await createSupabaseServerClient<'public'>('public');
  let session = isAuthBypassEnabled() ? createBypassSession() : null;

  if (!session) {
    const {
      data: { session: currentSession }
    } = await supabase.auth.getSession();
    session = currentSession;
  }

  if (!hasAdminAccess(session)) {
    return NextResponse.json({ message: 'Admin or SuperAdmin access is required.' }, { status: 403 });
  }

  const schemaNames = (process.env.NEXT_PUBLIC_DATABASE_SCHEMAS ?? 'public,access')
    .split(',')
    .map((schema) => schema.trim())
    .filter((schema) => schema === 'public' || schema === 'access');

  let prisma: PrismaClient | null = null;

  try {
    prisma = new PrismaClient();

    const schemaList = schemaNames.map((schema) => `'${schema}'`).join(',');
    const columns = await prisma.$queryRawUnsafe<
      { schema: string; table: string; column: string; dataType: string; udtName: string }[]
    >(`
      SELECT
        table_schema AS schema,
        table_name AS table,
        column_name AS column,
        data_type AS "dataType",
        udt_name AS "udtName"
      FROM information_schema.columns
      WHERE table_schema IN (${schemaList})
      ORDER BY table_schema, table_name, ordinal_position
    `);

    let schemaData: Record<string, unknown>[] = [];
    try {
      schemaData = await prisma.$queryRawUnsafe<Record<string, unknown>[]>('SELECT * FROM get_schema_data()');
    } catch (error) {
      if (!isMissingSchemaDataFunctionError(error)) {
        throw error;
      }
    }

    const schemaDefinitions: Record<string, Record<string, { properties: Record<string, unknown> }>> = {};
    for (const column of columns) {
      schemaDefinitions[column.schema] ??= {};
      schemaDefinitions[column.schema][column.table] ??= { properties: {} };

      const format = column.dataType === 'USER-DEFINED' ? column.udtName : column.dataType;
      const type =
        column.dataType === 'boolean'
          ? 'boolean'
          : ['smallint', 'integer', 'bigint'].includes(column.dataType)
            ? 'integer'
            : ['numeric', 'decimal', 'real', 'double precision'].includes(column.dataType)
              ? 'number'
              : ['json', 'jsonb'].includes(column.dataType)
                ? 'object'
                : column.dataType === 'ARRAY'
                  ? 'array'
                  : 'string';

      schemaDefinitions[column.schema][column.table].properties[column.column] = { type, format };
    }

    return NextResponse.json({ schemaData: schemaData ?? [], schemaDefinitions });
  } catch (error) {
    return NextResponse.json(
      { message: getAdminResourcesErrorMessage(error) },
      { status: 502 }
    );
  } finally {
    await prisma?.$disconnect();
  }
}
