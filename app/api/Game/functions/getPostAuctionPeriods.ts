import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Game, InsertPeriod } from '@/types/database';
import _ from 'lodash';
import { periods } from '../periods';

export const getPostAuctionPeriods = async (game: Game, year: number, periodsArray: InsertPeriod[]) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const auctionIndex = periods.findIndex((period) => period.type === 'auctionSold');
  const slicedPeriods = _.slice(periods, auctionIndex + 1, periods.length);

  const { data: tournament } = await supabase
    .from('Tournament')
    .select('finalYear')
    .eq('id', game?.tournamentId)
    .maybeSingle();

  slicedPeriods
    .filter((period) => year === tournament?.finalYear || period.type !== 'gameEnd' || game?.status === 'finalYear')
    .forEach((period) => {
      periodsArray.push({
        ..._.omit(period, 'practiceLength'),
        periodLength: year === 0 ? period?.practiceLength : period?.periodLength,
        periodOrder: periodsArray.length,
        gameId: game?.id,
        year
      });
    });
};
