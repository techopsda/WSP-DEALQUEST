import { Star } from 'lucide-react';
import { ReactElement } from 'react';

const getStarRating = (averageNumber: number) => {
  const stars: ReactElement[] = [];

  for (let i = 1; i <= Math.round(averageNumber); i++) {
    stars.push(<Star className="h-3 w-3" strokeWidth={2} />);
  }

  return stars;
};

export default getStarRating;
