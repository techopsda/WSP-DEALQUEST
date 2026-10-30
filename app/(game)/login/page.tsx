import { InstructorSignInForm } from '@/components/auth/InstructorLogInForm';
import { JoinALobby } from '@/components/landing/JoinALobby';
import { LobbyLayout } from '@/components/lobby/LobbyLayout';

const Login = () => {
  return <LobbyLayout includeLogo includeCopy children={<InstructorSignInForm />} footer={<JoinALobby />} />;
};

export default Login;
