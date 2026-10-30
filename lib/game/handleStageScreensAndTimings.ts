import { differenceInMilliseconds } from 'date-fns';

interface InputStageTimings {
  stageStartTime: Date;
  currentTime: Date;
  stageEndTime?: Date;
}

export const handleStageScreensAndTimings = (stageTimings: InputStageTimings) => {
  const { stageEndTime, currentTime, stageStartTime } = stageTimings;
  const clockOffset = differenceInMilliseconds(Date.now(), currentTime.getTime());

  return {
    stageTimings: {
      stageStartTime: stageStartTime,
      stageEndTime: stageEndTime ?? new Date(),
      currentTime: currentTime,
      clockOffset: clockOffset
    },
    difference: stageEndTime ? differenceInMilliseconds(stageEndTime, currentTime) : 0
  };
};
