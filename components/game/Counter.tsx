import { animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Props {
  from: number;
  to: number;
  duration?: number;
  decimals?: number;
}

export const Counter: React.FC<Props> = ({ from, to, duration = 0.5, decimals = 0 }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (node !== null) {
      const controls = animate(from, to, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(value) {
          node.textContent = (value ?? 0).toFixed(decimals);
        }
      });
      return () => controls.stop();
    }
  }, [from, to]);

  return <span ref={nodeRef} />;
};
