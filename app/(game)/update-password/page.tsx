import { UpdatePasswordForm } from '@/components/auth/UpdatePasswordForm';
import { JoinALobby } from '@/components/landing/JoinALobby';
import { LobbyLayout } from '@/components/lobby/LobbyLayout';

const UpdatePassword = () => {
  return <LobbyLayout includeLogo includeCopy children={<UpdatePasswordForm />} footer={<JoinALobby />} />;
};

export default UpdatePassword;
