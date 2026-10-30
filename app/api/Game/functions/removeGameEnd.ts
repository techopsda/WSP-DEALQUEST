import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Game } from '@/types/database';

export const removeGameEnd = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { error: errorUpdatingGame } = await supabase.from('Game').update({ status: 'active' }).eq('id', game?.id);
  if (errorUpdatingGame) {
    throw new Error(
      `Game/toggleFinalYear/removeGameEnd - ERROR UPDATING GAME STATUS TO ACTIVE: ${errorUpdatingGame.message}`
    );
  }

  const { data: lastPeriodForGame } = await supabase
    .from('Period')
    .select()
    .eq('gameId', game.id)
    .eq('year', game.year)
    .order('periodOrder', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastPeriodForGame?.type === 'gameEnd') {
    await supabase.from('Period').delete().eq('id', lastPeriodForGame.id);
    await supabase.from('Tournament').update({ finalYear: 6 }).eq('id', game.tournamentId);
  }
};
