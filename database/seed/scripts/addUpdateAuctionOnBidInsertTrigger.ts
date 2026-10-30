import { PrismaClient } from '@prisma/client';

export const addUpdateAuctionOnBidInsertTrigger = async (prismaClient: PrismaClient) => {
  console.log('Creating update auction on bid insert trigger...');
  const functionSql = `
        CREATE OR REPLACE FUNCTION public.update_auction_timer()
        RETURNS trigger
        language plpgsql
        security definer set search_path = public
        AS $$
        BEGIN

            PERFORM update_auction_timer_on_bid_insert(new.id);
        
            RETURN NULL;
        END;
        $$;
    `;
  const createUpdateAuctionOnBidInsertFunction = await prismaClient.$executeRawUnsafe(functionSql);
  console.log(`...result was ${createUpdateAuctionOnBidInsertFunction}`);

  console.log(`Dropping update auction on bid insert trigger...`);
  const dropTriggerSql = `
        DROP TRIGGER 
        IF EXISTS update_auction_on_bid_insert
        ON "public"."Bid";
    `;
  const dropUpdateAuctionOnBidInsertTrigger = await prismaClient.$executeRawUnsafe(dropTriggerSql);
  console.log(`...result was ${dropUpdateAuctionOnBidInsertTrigger}`);

  console.log(`Creating update auction on bid insert trigger...`);
  const createTriggerSql = `
        CREATE TRIGGER update_auction_on_bid_insert
        after INSERT on "public"."Bid"
        for each row execute procedure public.update_auction_timer();
    `;
  const createUpdateAuctionOnBidInsertTrigger = await prismaClient.$executeRawUnsafe(createTriggerSql);
  console.log(`...result was ${createUpdateAuctionOnBidInsertTrigger}`);
};
