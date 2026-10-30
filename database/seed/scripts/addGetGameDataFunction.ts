import { PrismaClient } from '@prisma/client';

export const addGetGameDataFunction = async (prismaClient: PrismaClient) => {
  const getGameDataFunctionSql = `
        create or replace function get_game_data("gameId" uuid) returns table (
            "id" uuid,
            "tournamentId" uuid,
            "year" int,
            "stage" int,
            "status" "GameStatus",
            "stageStartTime" timestamp,
            "stageEndTime" timestamp,
            "currentTime" timestamp
        )
        as $$
        SELECT
            "id",
            "tournamentId",
            "year",
            "stage",
            "status",
            "stageStartTime",
            "stageEndTime",
            NOW()
        FROM
            "Game"
        WHERE
            "id" = "gameId"
        $$ language sql;
    `;

  const createGameDataFunction = await prismaClient.$executeRawUnsafe(getGameDataFunctionSql);
  console.log(`...result was ${createGameDataFunction}`);
};
