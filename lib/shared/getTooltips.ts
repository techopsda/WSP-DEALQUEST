import { joyRideSteps } from '@/components/shared/joyrideSteps';
import { GamePeriodEnum } from '@/types/database';

export const getTooltips = (gamePeriodType: GamePeriodEnum, gameYear: number) => {
  const filteredTooltips = joyRideSteps?.[gamePeriodType]?.filter((tooltip) =>
    tooltip.year?.some((year) => year === gameYear)
  );
  return filteredTooltips;
};
