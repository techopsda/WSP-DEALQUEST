import { handleDQAPIError } from '@/lib/handleDQAPIError';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { GamePeriodEnum } from '@/types/database';
import { NextResponse } from 'next/server';
import { handlePeriodMove } from '../../Game/functions/handlePeriodMove';
import { moveGameToNextPeriod } from '../functions/moveGameToNextPeriod';

interface readyUpBody {
  teamId: string;
  teamStatus: string;
  gameId: string;
  gamePeriod: GamePeriodEnum;
}

export const revalidate = 0;

export const POST = async (request: Request) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const body: readyUpBody = await request.json();

  const teamId = body?.teamId;
  const gameId = body.gameId;
  const gamePeriod = body.gamePeriod;

  if (!gameId || !gamePeriod) {
    return handleDQAPIError(new Error('Team/readyUp - INSUFFICIENT GAME DETAILS. GAME ID || GAME STATUS MISSING.'));
  }
  if (!teamId) {
    return handleDQAPIError(new Error('Team/readyUp - NO TEAM ID PROVIDED'));
  }

  console.log(`Team/readyUp - TEAMID: ${teamId}`);

  const { error: updateError } = await supabase.from('Team').update({ status: 'awaitingNextPeriod' }).eq('id', teamId);
  if (updateError) {
    return handleDQAPIError(
      new Error(`Team/readyUp - ERROR UPDATING TEAM STATUS TO AWAITING NEXT PERIOD: ${updateError?.message}`)
    );
  }

  try {
    const oldAndNewGame = await moveGameToNextPeriod(gameId, gamePeriod);

    const oldGame = oldAndNewGame?.oldGame;
    const newGame = oldAndNewGame?.newGame;

    if (!oldGame || !newGame) {
      console.log('Team/readyUp - NO OLD OR NEW GAME RETURNED FROM moveGameToNextPeriod');
      return new NextResponse('SUCCESS', { status: 200 });
    }

    await handlePeriodMove(oldGame, newGame);
  } catch (e) {
    return handleDQAPIError(e as Error);
  }

  return new NextResponse('SUCCESS', { status: 200 });
};
