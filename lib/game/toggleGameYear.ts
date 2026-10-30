import { Game } from '@/types/database';
import axios from 'axios';
import { API_REQUEST_TIMEOUT_MS } from '@/lib/apiConfig';

export const toggleFinalYear = async (game: Game, addGameEnd: boolean) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/Game/toggleFinalYear`,
    { game, addGameEnd },
    { timeout: API_REQUEST_TIMEOUT_MS }
  );

  return { data: response?.data, error: null };
};
