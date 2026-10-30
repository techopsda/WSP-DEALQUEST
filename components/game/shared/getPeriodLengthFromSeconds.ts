import { Game, PeriodTypeEnum } from '@/types/database';
import { formatDuration, intervalToDuration } from 'date-fns';
import { periods } from '../../../app/api/Game/periods';

export const getPeriodLengthFromSeconds = (periodType: PeriodTypeEnum, game: Game) => {
  const period = periods.find((period) => period.type === periodType);

  return formatDuration(
    intervalToDuration({
      start: 0,
      end: (game.year === 0 ? period?.practiceLength ?? 0 : period?.periodLength ?? 0) * 1000
    }),
    { format: ['minutes', 'seconds'], delimiter: ' ' }
  );
};
