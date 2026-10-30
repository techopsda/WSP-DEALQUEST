import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { formatISO } from 'date-fns';

export const handleTournamentPause = async (tournamentId: string) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { error: tournamentUpdateError } = await supabase
    .from('Tournament')
    .update({ status: 'paused' })
    .eq('id', tournamentId);

  if (tournamentUpdateError) {
    throw new Error(
      `TOURNAMENT/functions/handleTournamentPause, ERROR UPDATING TOURNAMENT STATUS: ${tournamentUpdateError.message}`
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
      return {
        ...game,
        stageEndTime: null,
        stagePausedTime: formatISO(currentTimeAsDate)
      };
    });

    const { error } = await supabase.from('Game').upsert(newGameDetails);
    if (error) throw new Error(`TOURNAMENT/functions/handleTournamentPause, ERROR PAUSING GAMES: ${error.message}`);
  } else {
    throw new Error(`TOURNAMENT/functions/handleTournamentPause, FAILED TO GET ALL GAMES FOR TOURNAMENT`);
  }
};
