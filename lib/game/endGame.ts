import { Game } from '@/types/database';
import axios from 'axios';
import { API_REQUEST_TIMEOUT_MS } from '@/lib/apiConfig';

export const endGame = async (game: Game) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/Game/endGame`,
    { game },
    { timeout: API_REQUEST_TIMEOUT_MS }
  );

  return { data: response?.data, error: null };
};
