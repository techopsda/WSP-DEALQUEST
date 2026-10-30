import { PrismaClient } from '@prisma/client';

export const addAutomaticCreatedAndModifiedColumnsFunction = async (prismaClient: PrismaClient) => {
  console.log(`Creating automatic created/modified column update function...`);
  const updateSQL = `
    CREATE or REPLACE FUNCTION update_created_and_modfied()
    RETURNS TRIGGER AS $$
    BEGIN 
        NEW."modifiedAt" = now();
        NEW."createdAt" = OLD."createdAt";
        NEW."modifiedById" = auth.uid();
        NEW."createdById" = OLD."createdById";
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;
  const createAutomaticCreatedAndModifiedColumnsUpdateFunctionResult = await prismaClient.$executeRawUnsafe(updateSQL);
  console.log(`...result was ${createAutomaticCreatedAndModifiedColumnsUpdateFunctionResult}`);

  console.log(`Creating automatic created/modified column insert function...`);
  const insertSQL = `
    CREATE or REPLACE FUNCTION insert_created_and_modified()
    RETURNS TRIGGER AS $$
    BEGIN 
        NEW."createdAt" = now();
        NEW."modifiedAt" = NULL;
        NEW."createdById" = auth.uid();
        NEW."modifiedById" = NULL;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;
  const createAutomaticCreatedAndModifiedColumnsInsertFunctionResult = await prismaClient.$executeRawUnsafe(insertSQL);
  console.log(`...result was ${createAutomaticCreatedAndModifiedColumnsInsertFunctionResult}`);
};
