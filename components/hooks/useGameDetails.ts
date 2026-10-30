import { useContext } from 'react';
import { GameDetailsContext } from '../game/GameDetailsProvider';

export const useGameDetails = () => {
  return useContext(GameDetailsContext);
};
