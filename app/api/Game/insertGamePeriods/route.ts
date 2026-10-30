import { handleDQAPIError } from '@/lib/handleDQAPIError';
import { Game, GameStatusEnum } from '@/types/database';
import { NextResponse } from 'next/server';
import { insertGamePeriods } from '../functions/insertGamePeriods';

interface insertGamePeriodsBody {
  game: Game;
  status?: GameStatusEnum;
}

export const revalidate = 0;

export const POST = async (request: Request) => {
  const body: insertGamePeriodsBody = await request?.json();

  const game = body?.game;
  const status = body?.status;

  if (!game) {
    return handleDQAPIError(new Error('Game/insertGamePeriods - NO GAME PROVIDED'));
  }

  try {
    await insertGamePeriods(game, status);
  } catch (e) {
    return handleDQAPIError(e as Error);
  }

  return new NextResponse('SUCCESS', { status: 200 });
};
