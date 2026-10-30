import { PrismaClient } from '@prisma/client';

export const addUpdateAuctionTimerOnBidInsert = async (prismaClient: PrismaClient) => {
  console.log('Creating update auction timer on bid insert function...');
  const sql = `
        CREATE OR REPLACE function update_auction_timer_on_bid_insert(bid_id uuid)
        RETURNS VOID AS $$
        DECLARE
            game_id uuid;
        BEGIN
            SELECT "gameId" INTO "game_id" FROM "Bid" WHERE "id" = "bid_id";
            UPDATE "Game"
            SET 
                "stageStartTime" = Now(),
                "stageEndTime" = NOW() + interval '10'
            WHERE id = "game_id" 
            AND "year" != 0;
        END;
        $$ language plpgsql;
    `;
  const createUpdateAuctionTimerOnBidInsert = await prismaClient.$executeRawUnsafe(sql);
  console.log(`...result was ${createUpdateAuctionTimerOnBidInsert}`);
};
