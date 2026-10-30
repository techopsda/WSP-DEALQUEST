import { motion } from 'framer-motion';

const COLORS = ['#FFCC48', '#34A853', '#93B68C', '#B33030', '#D0826D', '#FBBC05'];
const PARTICLE_COUNT = 120;

export const ConfettiBurst = () => (
  <div className="pointer-events-none absolute left-1/2 top-0 h-0 w-0" aria-hidden="true">
    {Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
      const distance = 240 + (index % 8) * 34;
      const drift = ((index % 9) - 4) * 12;

      return (
        <motion.span
          key={index}
          className="absolute block h-3 w-2 rounded-sm"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.5 }}
          animate={{
            x: Math.cos(angle) * distance + drift,
            y: Math.sin(angle) * distance + 260,
            opacity: [1, 1, 0],
            rotate: 540 + (index % 5) * 90,
            scale: [0.5, 1, 0.8]
          }}
          transition={{ duration: 3, ease: 'easeOut', times: [0, 0.75, 1] }}
        />
      );
    })}
  </div>
);
