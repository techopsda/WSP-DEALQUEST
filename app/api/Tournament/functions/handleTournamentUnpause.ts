import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { add, differenceInSeconds, formatISO, sub } from 'date-fns';
import { periods } from '../../Game/periods';
import { moveGameToNextPeriod } from '../../Team/functions/moveGameToNextPeriod';

export const handleTournamentUnpause = async (tournamentId: string) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { error: tournamentUpdateError } = await supabase
    .from('Tournament')
    .update({ status: 'active' })
    .eq('id', tournamentId);

  if (tournamentUpdateError) {
    throw new Error(
      `TOURNAMENT/functions/handleTournamentUnpause, ERROR UPDATING TOURNAMENT STATUS: ${tournamentUpdateError.message}`
    );
  }

  const { data: currentServerTime, error: serverTimeError } = await supabase.rpc('get_current_server_time');
  if (serverTimeError) throw new Error(`FAILED TO GET CURRENT SERVER TIME: ${serverTimeError.message}`);
  if (!currentServerTime) throw new Error('FAILED TO GET CURRENT SERVER TIME');

  const { data: allGamesForTournament, error: gamesError } = await supabase
    .from('Game')
    .select()
    .eq('tournamentId', tournamentId);
  if (gamesError) throw new Error(`FAILED TO GET GAMES FOR TOURNAMENT: ${gamesError.message}`);

  if (allGamesForTournament) {
    const currentTimeAsDate = new Date(currentServerTime);

    const newGameDetails = allGamesForTournament.map((game) => {
      const { stageStartTime, stagePausedTime } = game;
      const gamePeriod = periods.find((period) => period.type === game.periodType);

      if (stageStartTime && stagePausedTime && gamePeriod) {
        const timeElapsedBeforePause = differenceInSeconds(new Date(stagePausedTime), new Date(stageStartTime));
        const timeRemainingBeforePause = gamePeriod.periodLength - timeElapsedBeforePause;

        return {
          ...game,
          stagePausedTime: null,
          stageStartTime: formatISO(sub(currentTimeAsDate, { seconds: timeElapsedBeforePause })),
          stageEndTime: formatISO(add(currentTimeAsDate, { seconds: timeRemainingBeforePause }))
        };
      }

      return game;
    });

    const { error } = await supabase.from('Game').upsert(newGameDetails);
    if (error) throw new Error(`TOURNAMENT/functions/handleTournamentUnpause, ERROR UNPAUSING GAMES: ${error.message}`);

    await Promise.all(newGameDetails.map((game) => moveGameToNextPeriod(game?.id, game?.periodType)));
  }
};
