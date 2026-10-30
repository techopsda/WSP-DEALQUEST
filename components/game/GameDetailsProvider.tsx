import { StageTimings } from '@/types/StageTimings';
import React from 'react';

interface GameDetailsProviderProps {
  children: React.ReactNode;
  stageTimings: StageTimings | null;
}

export const GameDetailsContext = React.createContext<{
  stageTimings: StageTimings | null;
}>({
  stageTimings: null
});

export const GameDetailsProvider: React.FC<GameDetailsProviderProps> = ({ children, stageTimings }) => {
  return <GameDetailsContext.Provider value={{ stageTimings }}>{children}</GameDetailsContext.Provider>;
};
