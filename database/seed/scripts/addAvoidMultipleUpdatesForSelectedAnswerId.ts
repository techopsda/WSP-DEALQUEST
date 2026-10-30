import { PrismaClient } from '@prisma/client';

export const addAvoidMultipleUpdatesForSelectedAnswerId = async (prismaClient: PrismaClient) => {
  console.log('Creating reject multiple updates for selectedAnswerId on teamQuestion function...');
  const teamQuestionTriggerSql = `
        CREATE or REPLACE FUNCTION verify_team_question_for_selected_answer_id()
        RETURNS trigger
        language plpgsql
        security definer set search_path = public
        AS $$
        BEGIN
        IF EXISTS (
            SELECT 1 FROM "TeamQuestion"
            WHERE "TeamQuestion"."id" = "new"."id"
            AND "selectedAnswerId" IS NOT NULL
          ) THEN
            RAISE EXCEPTION 'Answer already selected';
          END IF;
          RETURN NEW;
        END;
        $$;
    `;
  const createRejectMultipleUpdatesForSelectedAnswerIdFunction = await prismaClient.$executeRawUnsafe(
    teamQuestionTriggerSql
  );
  console.log(`...result was ${createRejectMultipleUpdatesForSelectedAnswerIdFunction}`);

  console.log(`Dropping reject multiple updates for selectedAnswerId on teamQuestion trigger...`);
  const dropTriggerSql = `
        DROP TRIGGER 
        IF EXISTS avoid_re_updating_selected_answer_id
        ON "public"."TeamQuestion";
    `;
  const dropCheckTeamQuestionValidityTrigger = await prismaClient.$executeRawUnsafe(dropTriggerSql);
  console.log(`...result was ${dropCheckTeamQuestionValidityTrigger}`);

  console.log(`Creating reject multiple updates for selectedAnswerId on teamQuestion trigger...`);
  const createTriggerSql = `
        CREATE TRIGGER avoid_re_updating_selected_answer_id
        BEFORE UPDATE ON "public"."TeamQuestion"
        for each row execute procedure public.verify_team_question_for_selected_answer_id() 
    `;
  const createCheckTeamQuestionValidityTrigger = await prismaClient.$executeRawUnsafe(createTriggerSql);
  console.log(`...result was ${createCheckTeamQuestionValidityTrigger}`);
};
