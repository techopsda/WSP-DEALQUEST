import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LobbyForm } from '../lobby/LobbyForm';

interface JoinLobbyProps {}

export const JoinLobby: React.FC<JoinLobbyProps> = () => {
  const router = useRouter();
  const [teamId, setTeamId] = useLocalStorage('teamId', '');

  const [lobbyCode, setLobbyCode] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const [joinLobbyDisabled, setJoinLobbyDisabled] = useState(false);

  const { supabase } = useSupabase<'public'>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onJoinLobbyClick = async () => {
    setIsLoading(true);
    setJoinLobbyDisabled(true);
    setWarningMessage(``);
    if (!lobbyCode) {
      setWarningMessage('Must enter a valid lobby code');
      setJoinLobbyDisabled(false);
      setIsLoading(false);
      return;
    }
    const { data: tournament, error: errorTournament } = await supabase
      .from('Tournament')
      .select('*, Game(*)')
      .eq('lobbyCode', lobbyCode)
      .or('status.eq.active,status.eq.paused')
      .maybeSingle();
    if (errorTournament || !tournament) {
      setWarningMessage(`No active lobby with lobby code ${lobbyCode}`);
      setJoinLobbyDisabled(false);
      setIsLoading(false);
      return;
    }
    const tournamentGames = tournament.Game;

    if (tournament.Game && tournamentGames?.length < 1) {
      const { data: team, error: teamError } = await supabase
        .from('Team')
        .insert({ tournamentId: tournament.id, status: 'awaitingTeamName' })
        .select()
        .single();
      if (teamError || !team) {
        setIsLoading(false);
        setWarningMessage(`Error creatng team`);
      }

      setTeamId(team?.id ?? '');
      router.push('/team-setup');
    } else {
      setWarningMessage('Cannot join lobby as it is already in progress');
      setJoinLobbyDisabled(false);
    }
  };

  return (
    <LobbyForm
      title="Join lobby"
      text="The lobby code will be provided by your instructor"
      inputValue={lobbyCode}
      inputPlaceholder="Enter lobby code"
      inputOnChange={(e) => setLobbyCode(e.target.value.toUpperCase())}
      buttonText="Join Lobby"
      buttonOnClick={onJoinLobbyClick}
      warningMessage={warningMessage}
      buttonDisabled={joinLobbyDisabled}
      allowEnterPress={true}
      isLoading={isLoading}
    />
  );
};
