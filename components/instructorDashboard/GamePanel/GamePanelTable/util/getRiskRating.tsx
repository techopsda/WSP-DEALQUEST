import clsx from 'clsx';
import { Circle } from 'lucide-react';
import { ReactElement } from 'react';

const getRiskRating = (amountRisk: number, count: number, width: string = 'w-5', height: string = 'h-5') => {
  const circles: ReactElement[] = [];

  for (let i = 1; i <= count; i++) {
    circles.push(
      <Circle
        className={clsx(
          'text-alpha-highlight',
          width,
          height,
          amountRisk >= 1 && i === 1 && 'text-green-700 fill-green-700',
          amountRisk > 1 && i === 2 && 'text-green-600 fill-green-600',
          amountRisk > 2 && i === 3 && 'text-yellow-400 fill-yellow-400',
          amountRisk > 3 && i === 4 && 'text-amber-700 fill-amber-700',
          amountRisk > 4 && i === 5 && 'text-red-700 fill-red-700'
        )}
        strokeWidth={2}
        key={i}
      />
    );
  }

  return circles;
};

export default getRiskRating;
