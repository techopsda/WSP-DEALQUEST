import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import _ from 'lodash';

export const updateTournamentWhenAllGamesEnd = async (tournamentId: string) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { data: allGamesForTournament } = await supabase.from('Game').select().eq('tournamentId', tournamentId);

  if (allGamesForTournament) {
    const allGamesAreEnded = _.every(allGamesForTournament, (game) => game.status === 'ended');

    if (allGamesAreEnded) {
      const { error: errorUpdatingTournament } = await supabase
        .from('Tournament')
        .update({ status: 'inactive' })
        .eq('id', tournamentId);

      if (errorUpdatingTournament) {
        throw new Error(
          `Game/functions/updateTournamentOnAllGamesEnd,  Error killing tournament when all games end: ${errorUpdatingTournament.message}`
        );
      }
    }
  }
};
