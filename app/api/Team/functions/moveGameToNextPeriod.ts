import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { GamePeriodEnum } from '@/types/database';
import { add, formatISO } from 'date-fns';
import { updateTournamentWhenAllGamesEnd } from '../../Game/functions/updateTournamentWhenAllGamesEnd';

export const moveGameToNextPeriod = async (gameId: string, gamePeriod?: GamePeriodEnum) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  console.log('run line 7 , moveGameToNextPeriod');
  const { data: allTeamsForGame, error: teamsError } = await supabase
    .from('Team')
    .select('*, Game(*,Tournament(status))')
    .eq('gameId', gameId);
  if (teamsError) throw new Error(`moveGameToNextPeriod - FAILED TO GET TEAMS: ${teamsError.message}`);

  const allTeamsReady =
    (allTeamsForGame?.length ?? 0) > 0 && allTeamsForGame?.every((team) => team?.status === 'awaitingNextPeriod');
  const currentGame = allTeamsForGame?.[0]?.Game;

  console.log(
    'moveGameToNextPeriod all teams ready: ',
    !allTeamsForGame?.find((team) => team.status !== 'awaitingNextPeriod')
  );

  if (
    allTeamsForGame &&
    currentGame &&
    allTeamsReady &&
    currentGame?.Tournament?.status !== 'paused' &&
    currentGame?.periodType === gamePeriod
  ) {
    console.log(
      'moveGameToNextPeriod, CURRENT GAME EXISTS - ALL GAMES UNPAUSED - CURRENT GAME IS EQUAL TO INITIAL API CALL PERIOD - ALL TEAMS READY'
    );

    const { data: lastPeriod, error: lastPeriodError } = await supabase
      .from('Period')
      .select()
      .eq('gameId', currentGame?.id)
      .eq('year', currentGame?.year)
      .order('periodOrder', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (lastPeriodError)
      throw new Error(`moveGameToNextPeriod - FAILED TO GET LAST PERIOD: ${lastPeriodError.message}`);

    const { data: nextPeriod, error: nextPeriodError } = await supabase
      .from('Period')
      .select()
      .eq('gameId', currentGame?.id)
      .eq('periodOrder', currentGame?.period + 1)
      .eq('year', currentGame?.year)
      .maybeSingle();
    if (nextPeriodError)
      throw new Error(`moveGameToNextPeriod - FAILED TO GET NEXT PERIOD: ${nextPeriodError.message}`);

    if (lastPeriod && lastPeriod.periodOrder === currentGame?.period) {
      console.log('moveGameToNextPeriod, RUNNING LAST PERIOD LOGIC');
      if (currentGame?.status === 'active') {
        console.log('moveGameToNextPeriod - CURRENT GAME STATUS IS ACTIVE - SETTING GAME TO WAITING FOR NEXT YEAR');
        const { error: updateGameError } = await supabase
          .from('Game')
          .update({ status: 'waitingForNextYear' })
          .eq('id', currentGame.id)
          .eq('status', 'active')
          .eq('period', lastPeriod.periodOrder)
          .select();

        if (updateGameError) {
          throw new Error(
            `moveGameToNextPeriod - year:${currentGame?.year}, periodType: ${currentGame?.periodType}, GAME UPDATE ERROR SETTING GAME TO WAITING FOR NEXT YEAR: ${updateGameError.message}`
          );
        }
      } else if (currentGame?.status === 'finalYear') {
        console.log(' moveGameToNextPeriod, CURRENT GAME YEAR IS FINAL YEAR - SETTING GAME TO ENDED');
        const { error: updateGameError } = await supabase
          .from('Game')
          .update({ status: 'ended' })
          .eq('id', currentGame.id)
          .eq('status', 'finalYear')
          .eq('period', lastPeriod.periodOrder)
          .select();

        if (updateGameError) {
          throw new Error(
            `moveGameToNextPeriod - year:${currentGame?.year}, periodType: ${currentGame?.periodType}, GAME UPDATE ERROR SETTING GAME TO ENDED: ${updateGameError.message}`
          );
        }

        await updateTournamentWhenAllGamesEnd(currentGame?.tournamentId);
      }
    }

    if (nextPeriod) {
      console.log('moveGameToNextPeriod, SUCCESSFULLY FOUND NEXT PERIOD');
      const { data, error: gameDataError } = await supabase.rpc('get_game_data', { gameId: currentGame?.id ?? '' });
      if (gameDataError) throw new Error(`moveGameToNextPeriod - FAILED TO GET GAME DATA: ${gameDataError.message}`);
      if (!data || !data[0]?.currentTime) {
        throw new Error('moveGameToNexrPeriod - FAILED TO GET CURRENT TIME');
      }

      const currentTime = new Date(data[0].currentTime);
      console.log('moveGameToNextPeriod - SUCCESSFULLY FETCHED CURRENT SERVER TIME');
      const { data: newGame, error: gameUpdateError } = await supabase
        .from('Game')
        .update({
          stage: nextPeriod.stage,
          period: nextPeriod.periodOrder,
          periodType: nextPeriod.type,
          stageStartTime: formatISO(currentTime),
          stageEndTime: formatISO(add(currentTime, { seconds: nextPeriod.periodLength }))
        })
        .eq('id', currentGame?.id)
        .eq('periodType', gamePeriod)
        .select()
        .maybeSingle();

      console.log('moveGameToNextPeriod - UPDATED GAME', newGame);
      if (gameUpdateError)
        throw new Error(
          `moveGameToNextPeriod - year:${currentGame?.year}, periodType: ${currentGame?.periodType}, GAME UPDATE ERROR ON PERIOD UPDATE: ${gameUpdateError.message}`
        );

      return { oldGame: currentGame, newGame: newGame };
    }
  }
};
