import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Game, GameStatusEnum, InsertPeriod, Period } from '@/types/database';
import { getAuctionPeriods } from './getAuctionPeriods';
import { startFirstPeriodForYear } from './startFirstPeriodForYear';
import { getPreAuctionPeriods } from './getPreAuctionPeriods';
import { getPostAuctionPeriods } from './getPostAuctionPeriods';

export const insertGamePeriods = async (game: Game, status?: GameStatusEnum) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const periodsArray: InsertPeriod[] = [];

  const newGameYear = game?.status === 'notStarted' ? game.year : game.year + 1;

  getPreAuctionPeriods(game.id, newGameYear, periodsArray);
  await getAuctionPeriods(game.id, newGameYear, periodsArray);
  await getPostAuctionPeriods(game, newGameYear, periodsArray);

  const { data: periodReturnData, error: ErrorInsertingGamePerios } = await supabase
    .from('Period')
    .insert(periodsArray as Period[])
    .select();
  if (ErrorInsertingGamePerios || !periodReturnData || periodReturnData?.length < 1)
    throw new Error(
      `GAME/insertGamePeriods => year: ${game.year}, PERIOD UPDATE ERROR ON STATUS CHANGE FOR GAME: ${ErrorInsertingGamePerios?.message}`
    );

  await startFirstPeriodForYear(game.id, newGameYear, periodReturnData, status);
};
