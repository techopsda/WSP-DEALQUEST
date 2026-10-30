import { handleDQAPIError } from '@/lib/handleDQAPIError';
import { Game } from '@/types/database';
import { NextResponse } from 'next/server';
import { insertGameEnd } from '../functions/insertGameEnd';
import { removeGameEnd } from '../functions/removeGameEnd';

interface toggleFinalYearBody {
  game: Game;
  addGameEnd: boolean;
}

export const revalidate = 0;

export const POST = async (request: Request) => {
  const body: toggleFinalYearBody = await request.json();

  const game = body?.game;
  const addGameEnd = body?.addGameEnd;

  if (!game) {
    return handleDQAPIError(new Error('Game/toggleFinalYear - NO GAME PROVIDED'));
  }
  if (addGameEnd !== true && addGameEnd !== false) {
    return handleDQAPIError(new Error('Game/toggleFinalYear - NO addGameEnd PROVIDED'));
  }

  try {
    if (addGameEnd) await insertGameEnd(game);
    else await removeGameEnd(game);
  } catch (e) {
    return handleDQAPIError(e as Error);
  }

  return new NextResponse('SUCCESS', { status: 200 });
};
