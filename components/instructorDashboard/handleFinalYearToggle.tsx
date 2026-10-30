import { toggleFinalYear } from '@/lib/game/toggleGameYear';
import { Game } from '@/types/database';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const handleFinalYearToggle = async (
  supabase: SupabaseClient<Database, 'public'>,
  tournamentId: string,
  finalYear: number,
  setToFinalYear: boolean,
  games: Game[]
) => {
  if (setToFinalYear) {
    const { error } = await supabase.from('Tournament').update({ finalYear }).eq('id', tournamentId);
    if (error) throw error;
  }

  await Promise.all(games?.map((game) => toggleFinalYear(game, setToFinalYear)));
};
