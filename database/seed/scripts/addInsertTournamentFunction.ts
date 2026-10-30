import { PrismaClient } from '@prisma/client';

export const addInsertTournamentFunction = async (prismaClient: PrismaClient) => {
  console.log('Creating insert tournament function...');
  const sql = `
      CREATE OR REPLACE FUNCTION insert_tournament("created_by_id" uuid, "generatedLobbyCode" varchar, "includePracticeRound" boolean, "instructor_name" varchar default null)
      RETURNS VOID
      AS $$
      BEGIN
        IF NOT EXISTS (SELECT "id" FROM "Tournament" t WHERE t."createdById" = "created_by_id" AND t."status" = 'active') THEN
          INSERT INTO "Tournament" ("lobbyCode", "practiceRound", "createdById", "instructorName")
          VALUES ("generatedLobbyCode", "includePracticeRound", "created_by_id", "instructor_name");
        END IF;
      END;
      $$ language plpgsql;
    `;

  const createInsertTournamentFunction = await prismaClient.$executeRawUnsafe(sql);
  console.log(`...result was ${createInsertTournamentFunction}`);
};
