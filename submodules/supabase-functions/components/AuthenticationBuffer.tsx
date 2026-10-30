import { LoadingScreen } from './LoadingScreen';
import { WaitForSession } from './WaitForSession';

interface AuthenticationBufferProps {
  redirectUrl: string;
  customLoadingComponent?: React.ReactNode;
}

export const AuthenticationBuffer: React.FC<AuthenticationBufferProps> = ({ redirectUrl, customLoadingComponent }) => {
  return (
    <>
      {customLoadingComponent && customLoadingComponent}
      {!customLoadingComponent && <LoadingScreen />}
      <WaitForSession redirectUrl={redirectUrl} />
    </>
  );
};
