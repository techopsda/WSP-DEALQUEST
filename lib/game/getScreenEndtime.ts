import { add } from 'date-fns';

export const getScreenEndTime = (screenLength?: number, previousEndTime?: Date) => {
  return screenLength && previousEndTime ? add(previousEndTime, { seconds: screenLength }) : undefined;
};
