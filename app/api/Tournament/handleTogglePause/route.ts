import { handleDQAPIError } from '@/lib/handleDQAPIError';
import { NextRequest, NextResponse } from 'next/server';
import { handleTournamentPause } from '../functions/handleTournamentPause';
import { handleTournamentUnpause } from '../functions/handleTournamentUnpause';

export const revalidate = 0;

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const tournamentId = body?.tournamentId;
  const pause = body?.pause;

  if (!tournamentId) {
    return handleDQAPIError(new Error('FAILED - TOURNAMENT PAUSE: Missing tournamentId'));
  }
  if (pause !== true && pause !== false) {
    return handleDQAPIError(new Error('FAILED - TOURNAMENT PAUSE: Missing pause status'));
  }

  try {
    if (pause) {
      await handleTournamentPause(tournamentId);
    } else {
      await handleTournamentUnpause(tournamentId);
    }
  } catch (e) {
    return handleDQAPIError(e as Error);
  }

  return new NextResponse('SUCCESS', { status: 200 });
};
