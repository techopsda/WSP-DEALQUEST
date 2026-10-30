import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Game, Period } from '@/types/database';
import _ from 'lodash';
import { periods } from '../periods';

export const insertGameEnd = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const gameEndPeriod = periods?.find((period) => period.type === 'gameEnd');

  const { error: gameUpdateError } = await supabase.from('Game').update({ status: 'finalYear' }).eq('id', game.id);
  if (gameUpdateError) {
    throw new Error(`GAME/functions/insertGameEnd => year:${game.year}, ERROR UPDATING GAME TO FINAL YEAR`);
  }

  const { data: lastPeriodForGame } = await supabase
    .from('Period')
    .select()
    .eq('gameId', game.id)
    .eq('year', game.year)
    .order('periodOrder', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastPeriodForGame?.type !== 'gameEnd' && gameEndPeriod) {
    const omittedPracticeLengthPeriod = _.omit(gameEndPeriod, 'practiceLength') as Period;

    const { error: errorInsertingPeriods } = await supabase.from('Period').insert({
      ...omittedPracticeLengthPeriod,
      gameId: game.id,
      periodOrder: (lastPeriodForGame?.periodOrder ?? 0) + 1,
      year: game.year
    });
    if (errorInsertingPeriods) {
      throw new Error(`GAME/functions/insertGameEnd => year:${game.year}, ERROR INSERTING PERIODS`);
    }
  }
};
