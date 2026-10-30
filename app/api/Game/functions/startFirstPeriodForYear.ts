import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { GameStatusEnum, Period } from '@/types/database';
import { add, formatISO } from 'date-fns';

export const startFirstPeriodForYear = async (
  gameId: string,
  newGameYear: number,
  periods: Period[],
  status?: GameStatusEnum
) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { data } = await supabase.rpc('get_game_data', { gameId: gameId });
  if (!data || !data[0]?.currentTime) throw new Error('FAILED TO GET CURRENT TIME');
  const currentTime = new Date(data[0].currentTime);

  const firstPeriodForYear = periods.find((period) => period.periodOrder === 0);

  if (firstPeriodForYear) {
    const { error: gameUpdateError } = await supabase
      .from('Game')
      .update({
        stage: firstPeriodForYear.stage,
        period: firstPeriodForYear.periodOrder,
        periodType: firstPeriodForYear.type,
        stageStartTime: formatISO(currentTime),
        stageEndTime: formatISO(add(currentTime, { seconds: firstPeriodForYear.periodLength })),
        year: newGameYear,
        status: status ?? 'active'
      })
      .eq('id', gameId);
    if (gameUpdateError)
      throw new Error(
        `GAME/insertGamePeriods/startFirstPeriodForYear => year:${newGameYear}, ERROR STARTING GAME PERIOD: ${gameUpdateError.message}`
      );

    const { error: teamUpdateError } = await supabase.from('Team').update({ status: 'active' }).eq('gameId', gameId);
    if (teamUpdateError)
      throw new Error(
        'GAME/insertGamePeriods/startFirstPeriodForYear => year: ERROR STARTING GAME PERIOD ' + teamUpdateError.message
      );
  } else {
    throw new Error(
      `GAME/insertGamePeriods/startFirstPeriodForYear => year:${newGameYear}, COULD NOT FIND FIRST PERIOD FOR GAME YEAR CHANGE`
    );
  }
};
