import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { GameStatusEnum } from '@/types/database';
import _ from 'lodash';

export const handleEndAllGames = async (tournamentId: string) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { error: tournamentUpdateError } = await supabase
    .from('Tournament')
    .update({ status: 'inactive' })
    .eq('id', tournamentId);

  if (tournamentUpdateError) {
    throw new Error(
      `Tournament/functions/handleEndAllGames, Error updating tournament to inactive: ${tournamentUpdateError.message}`
    );
  }

  const { data: allGamesForTournament, error: ErrorFetchingAllGamesForTournament } = await supabase
    .from('Game')
    .select()
    .eq('tournamentId', tournamentId)
    .neq('status', 'ended');

  if (allGamesForTournament) {
    const updatedGames = _.flatMap(allGamesForTournament, (game) => {
      return { ...game, status: 'ended' as GameStatusEnum };
    });

    const { error: ErrorEndingAllGames } = await supabase.from('Game').upsert(updatedGames);
    if (ErrorEndingAllGames) {
      throw new Error(
        `Tournament/functions/handleEndAllGames, Could not end all games for this tournament :
        ${ErrorEndingAllGames.message}`
      );
    }
  } else {
    throw new Error(
      `Tournament/functions/handleEndAllGames, Could not fetch all games for this tournament: ${ErrorFetchingAllGamesForTournament.message}`
    );
  }
};
