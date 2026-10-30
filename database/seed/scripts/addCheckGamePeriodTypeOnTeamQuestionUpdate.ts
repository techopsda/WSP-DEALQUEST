import { PrismaClient } from '@prisma/client';

export const addCheckGamePeriodTypeOnTeamQuestionUpdate = async (prismaClient: PrismaClient) => {
  console.log('Creating check game periodType before update TeamQuestion function...');
  const functionSql = `
        CREATE OR REPLACE FUNCTION public.check_game_period_type() 
        RETURNS trigger
        language plpgsql
        security definer set search_path = public
        AS $$
            BEGIN

                -- Check if the game periodType is not equal to 'questions'
                if (select "periodType" from "Game" where id = (select "gameId" from "Team" where id = new."teamId")) != 'questions' then
                -- Raise an exception
                raise exception 'The game periodType is not questions';
                end if;
                return new;
            END;
            $$;    
    `;
  const createCheckGamePeriodTypeOnTeamQuestionUpdateTrigger = await prismaClient.$executeRawUnsafe(functionSql);
  console.log(`...result was ${createCheckGamePeriodTypeOnTeamQuestionUpdateTrigger}`);

  console.log(`Dropping check game periodType before update TeamQuestion trigger...`);
  const dropTriggerSql = `
        DROP TRIGGER 
        IF EXISTS check_game_period_type_trigger
        ON "public"."TeamQuestion";
    `;
  const dropCheckGamePeriodTypeOnTeamQuestionUpdateTrigger = await prismaClient.$executeRawUnsafe(dropTriggerSql);
  console.log(`...result was ${dropCheckGamePeriodTypeOnTeamQuestionUpdateTrigger}`);

  console.log(`Creating check game periodType before update TeamQuestion trigger...`);
  const createTriggerSql = `
        CREATE TRIGGER check_game_period_type_trigger
        before UPDATE on "public"."TeamQuestion"
        for each row execute procedure public.check_game_period_type();
    `;
  const createUpdateAuctionOnBidInsertTrigger = await prismaClient.$executeRawUnsafe(createTriggerSql);
  console.log(`...result was ${createUpdateAuctionOnBidInsertTrigger}`);
};
