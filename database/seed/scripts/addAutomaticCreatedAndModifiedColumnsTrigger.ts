import { PrismaClient } from '@prisma/client';

export const addAutomaticCreatedAndModifiedColumnsTrigger = async (
  prismaClient: PrismaClient,
  schema: string,
  table: string
) => {
  console.log(`Dropping automatic created/modified column insert trigger for ${schema}.${table}...`);
  const dropInsertSQL = `
    DROP TRIGGER IF EXISTS insert_created_and_modified ON "${schema}"."${table}"; 
  `;
  const dropInsertAutomaticCreatedAndModifiedColumnsResult = await prismaClient.$executeRawUnsafe(dropInsertSQL);
  console.log(`...result was ${dropInsertAutomaticCreatedAndModifiedColumnsResult}`);

  console.log(`Dropping automatic created/modified column update trigger for ${schema}.${table}...`);
  const dropUpdateSQL = `
    DROP TRIGGER IF EXISTS update_created_and_modfied ON "${schema}"."${table}";
  `;
  const dropUpdateAutomaticCreatedAndModifiedColumnsResult = await prismaClient.$executeRawUnsafe(dropUpdateSQL);
  console.log(`...result was ${dropUpdateAutomaticCreatedAndModifiedColumnsResult}`);

  console.log(`Creating automatic created/modified column insert triggers for ${schema}.${table}...`);
  const createInsertSQL = `
    CREATE TRIGGER insert_created_and_modified BEFORE INSERT ON "${schema}"."${table}" FOR EACH ROW EXECUTE PROCEDURE insert_created_and_modified(); 
  `;
  const createInsertAutomaticCreatedAndModifiedColumnsResult = await prismaClient.$executeRawUnsafe(createInsertSQL);
  console.log(`...result was ${createInsertAutomaticCreatedAndModifiedColumnsResult}`);

  console.log(`Creating automatic created/modified column update triggers for ${schema}.${table}...`);
  const createUpdateSQL = `
    CREATE TRIGGER update_created_and_modfied BEFORE UPDATE ON "${schema}"."${table}" FOR EACH ROW EXECUTE PROCEDURE update_created_and_modfied();
  `;
  const createUpdateAutomaticCreatedAndModifiedColumnsResult = await prismaClient.$executeRawUnsafe(createUpdateSQL);
  console.log(`...result was ${createUpdateAutomaticCreatedAndModifiedColumnsResult}`);
};
