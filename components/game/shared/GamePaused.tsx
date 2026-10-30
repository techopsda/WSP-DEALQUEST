import { PauseCircle } from 'lucide-react';

export const GamePaused = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full p-6 bg-warning text-white flex items-center gap-3">
      <PauseCircle />
      Your instructor has paused the lobby
    </div>
  );
};
