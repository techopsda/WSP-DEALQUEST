import useIsInstructor from '@/components/hooks/useInstructor';

interface Props {
  allTeamsReady: boolean;
}

export const Message: React.FC<Props> = ({ allTeamsReady }) => {
  const isInstructor = useIsInstructor();
  const footerNotReadyMessage =
    'Please make everyone aware the game is about to begin before clicking the "start games" button. If you want teams to move to be sat near other companies in their game now is the time to do so.';
  const footerReadyMessage =
    'Clicking the button will lock the number of teams, please make sure everyone has joined and are ready to play the game.';
  return (
    <p className={`max-w-4xl ${!isInstructor && 'text-lg'}`}>
      {allTeamsReady && isInstructor && <span>{footerReadyMessage}</span>}
      {!allTeamsReady && isInstructor && <span>{footerNotReadyMessage}</span>}
      {!isInstructor && <span>Waiting for the instructor to start the game</span>}
    </p>
  );
};
