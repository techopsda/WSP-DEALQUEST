import { animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface TimerCounterProps {
  fromMinutes: number;
  toMinutes: number;
  from?: number;
  to?: number;
}

export const TimerCounter: React.FC<TimerCounterProps> = ({ fromMinutes, toMinutes, from, to }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (node !== null && fromMinutes <= toMinutes) {
      const controls = animate(from ?? fromMinutes, to ?? toMinutes, {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(value) {
          node.textContent = value?.toFixed(0)?.toString()?.padStart(2, '0');
        }
      });
      return () => controls.stop();
    } else if (node !== null) {
      node.textContent = (to ?? toMinutes)?.toFixed(0)?.toString()?.padStart(2, '0');
    }
  }, [from, to, fromMinutes, toMinutes]);

  return <span ref={nodeRef} />;
};
