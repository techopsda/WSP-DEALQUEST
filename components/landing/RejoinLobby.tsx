import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LobbyForm } from '../lobby/LobbyForm';

interface RejoinLobbyProps {}

export const RejoinLobby: React.FC<RejoinLobbyProps> = () => {
  const [teamId, setTeamId] = useLocalStorage('teamId', '');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { supabase } = useSupabase<'public'>();

  const onRejoinLobbyClick = async () => {
    setIsLoading(true);
    setWarningMessage(``);
    if (!registrationNumber) {
      setIsLoading(false);
      setWarningMessage('Must enter a valid registration number');
      return;
    }
    const { data: team, error: teamError } = await supabase
      .from('Team')
      .select()
      .eq('registrationNumber', registrationNumber)
      .maybeSingle();

    if (teamError || !team) {
      setIsLoading(false);
      setWarningMessage(`No team with the registration number ${registrationNumber}`);
      return;
    }

    const { data: tournament, error: tournamentError } = await supabase
      .from('Tournament')
      .select('lobbyCode')
      .eq('id', team.tournamentId)
      .maybeSingle();
    if (!tournament || tournamentError) {
      setIsLoading(false);
      setWarningMessage('Error rerouting to all games');
    }

    setTeamId(team.id);
    if (team.status === 'active' && team.gameId) {
      router.push(`/tournament/${tournament?.lobbyCode}`);
    } else if (team.status === 'active') {
      router.push(`/tournament/${tournament?.lobbyCode}`);
    } else {
      router.push('/team-setup');
    }
  };

  return (
    <LobbyForm
      title="Rejoin Lobby"
      text="Enter the registration number provided to you at the end of team setup"
      inputValue={registrationNumber}
      inputPlaceholder="Enter registration number"
      inputOnChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
      buttonText="Rejoin Lobby"
      buttonOnClick={onRejoinLobbyClick}
      warningMessage={warningMessage}
      isLoading={isLoading}
    />
  );
};
