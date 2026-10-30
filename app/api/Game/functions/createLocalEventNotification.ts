import { Game, LocalEvent, Team } from '@/types/database';

export const createLocalEventNotification = (
  team: Team,
  game: Game,
  localEvent: LocalEvent,
  localEventAmount: number
) => {
  const localEventIsPositive = localEvent?.type === 'positive' || game.year === 0;

  return {
    year: game.year,
    stage: game.stage,
    message: {
      messageAction: localEventIsPositive ? 'awarded' : 'deducted',
      messageValue: `${localEventAmount}`,
      type: localEventIsPositive ? 'positiveEvent' : 'negativeEvent'
    },
    type: 'localEventType',
    teamId: team.id
  };
};
