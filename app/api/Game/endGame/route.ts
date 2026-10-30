import { handleDQAPIError } from '@/lib/handleDQAPIError';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { NextResponse } from 'next/server';
import { updateTournamentWhenAllGamesEnd } from '../functions/updateTournamentWhenAllGamesEnd';

export const revalidate = 0;

export const POST = async (request: Request) => {
  const body = await request.json();

  const game = body?.game;

  if (!game) {
    return handleDQAPIError(new Error('Game/endGame - NO GAME PROVIDED'));
  }

  try {
    const supabase = await createSupabaseServerClient<'public'>('public');

    const { error: updateGameError } = await supabase.from('Game').update({ status: 'ended' }).eq('id', game?.id);
    if (updateGameError) {
      throw new Error(`Game/endGame - ERROR UPDATING GAME STATUS TO ENDED: ${updateGameError?.message}`);
    }

    await updateTournamentWhenAllGamesEnd(game?.tournamentId);
  } catch (e) {
    return handleDQAPIError(e as Error);
  }

  return new NextResponse('SUCCESS', { status: 200 });
};
