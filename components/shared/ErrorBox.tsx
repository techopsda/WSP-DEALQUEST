import { AlertCircle } from 'lucide-react';
import { JoinALobby } from '../landing/JoinALobby';
import { LobbyLayout } from '../lobby/LobbyLayout';

interface Props {
  title: string;
  message: string;
}

export const ErrorBox: React.FC<Props> = ({ title, message }) => {
  return (
    <LobbyLayout
      includeLogo
      footer={<JoinALobby />}
      children={
        <div className="flex items-center flex-col gap-3">
          <AlertCircle className="w-12 h-12 text-error-light" strokeWidth={1} />
          <h1 className="text-white font-heading leading-snug text-5xl text-center">{title}</h1>
          <p className="text-lg">{message}</p>
        </div>
      }
    />
  );
};
