import { ForgottenPasswordForm } from '@/components/auth/ForgottenPasswordForm';
import { JoinALobby } from '@/components/landing/JoinALobby';
import { LobbyLayout } from '@/components/lobby/LobbyLayout';

const Login = () => {
  return <LobbyLayout includeLogo includeCopy children={<ForgottenPasswordForm />} footer={<JoinALobby />} />;
};

export default Login;
