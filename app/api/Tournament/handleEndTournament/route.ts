import { handleDQAPIError } from '@/lib/handleDQAPIError';
import { NextResponse } from 'next/server';
import { handleEndAllGames } from '../functions/handleEndAllGames';

export const revalidate = 0;

export const POST = async (request: Request) => {
  const body = await request?.json();

  const tournamentId = body?.tournamentId;

  if (!tournamentId) {
    return handleDQAPIError(new Error('FAILED - TOURNAMENT END: Missing tournamentId'));
  }

  try {
    await handleEndAllGames(tournamentId);
  } catch (e) {
    return handleDQAPIError(e as Error);
  }

  return new NextResponse('SUCCESS', { status: 200 });
};
