import { useEffect, useState } from 'react';

export const useTimeout = (initialState?: { ms: number; callback: () => void }) => {
  const [timeoutObject, setCurrentTimeoutObject] = useState<{ ms: number; callback: () => void } | undefined>(
    initialState
  );
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutObject) {
      clearTimeout(currentTimeout);
      setCurrentTimeout(setTimeout(timeoutObject.callback, timeoutObject?.ms));
    }
  }, [timeoutObject]);

  return [timeoutObject, setCurrentTimeoutObject] as const;
};
