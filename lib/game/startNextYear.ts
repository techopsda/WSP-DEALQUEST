import { Game, GameStatusEnum } from '@/types/database';
import axios from 'axios';
import { API_REQUEST_TIMEOUT_MS } from '@/lib/apiConfig';

export const startNextYear = async (game: Game, status?: GameStatusEnum) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/Game/insertGamePeriods`,
    { game, status },
    { timeout: API_REQUEST_TIMEOUT_MS }
  );

  return { data: response?.data, error: null };
};
