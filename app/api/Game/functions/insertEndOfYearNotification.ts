import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Game } from '@/types/database';
import { toWords } from 'number-to-words';

export const insertEndOfYearNotification = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { error: errorInsertingNotification } = await supabase.from('Notification').insert({
    message: { eventOutcome: game.year > 0 ? `Year ${toWords(game.year)} End` : 'Practice Year Ended' },
    type: 'endOfYearType',
    year: game.year,
    stage: game.stage,
    gameId: game.id
  });

  if (errorInsertingNotification) {
    throw new Error(
      `GAME/functions/insertEndOfYearNotification => year: ${game.year} ERROR INSERTING END OF YEAR NOTIFICATION: ${errorInsertingNotification.message}`
    );
  }
};
