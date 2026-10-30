import { Game } from '@/types/database';
import axios from 'axios';
import { API_REQUEST_TIMEOUT_MS } from '@/lib/apiConfig';

export const readyUpTeam = async (game: Game, teamId: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/Team/readyUp`,
    {
      teamId,
      gameId: game?.id,
      gamePeriod: game?.periodType
    },
    { timeout: API_REQUEST_TIMEOUT_MS }
  );

  return { data: response?.data, error: null };
};
