import { PrismaClient } from '@prisma/client';

export const addRejectInvalidBidTrigger = async (prismaClient: PrismaClient) => {
  console.log('Creating reject invalid bids function...');
  const rejectInvalidBidsSql = `
        CREATE OR REPLACE FUNCTION reject_invalid_bid()
        RETURNS trigger
        language plpgsql
        security definer set search_path = public
        AS $$
        BEGIN
            IF EXISTS (
            SELECT 1 FROM "Bid"
            WHERE "auctionId" = NEW."auctionId"
            AND amount >= NEW.amount
            ) THEN
            RAISE EXCEPTION 'Invalid bid';
            END IF;
            RETURN NEW;
        END;
        $$;
    `;
  const createRejectInvalidBidsFunction = await prismaClient.$executeRawUnsafe(rejectInvalidBidsSql);
  console.log(`...result was ${createRejectInvalidBidsFunction}`);

  console.log(`Dropping check bid validity trigger...`);
  const dropTriggerSql = `
        DROP TRIGGER 
        IF EXISTS check_bid_validity
        ON "public"."Bid";
    `;
  const dropCheckBidValidityTrigger = await prismaClient.$executeRawUnsafe(dropTriggerSql);
  console.log(`...result was ${dropCheckBidValidityTrigger}`);

  console.log(`Creating check bid validity trigger...`);
  const createTriggerSql = `
        CREATE TRIGGER check_bid_validity
        BEFORE INSERT ON "public"."Bid"
        for each row execute procedure public.reject_invalid_bid()
    `;
  const createCheckBidValidityTrigger = await prismaClient.$executeRawUnsafe(createTriggerSql);
  console.log(`...result was ${createCheckBidValidityTrigger}`);
};
