import generateRegistrationCode from '@/lib/tournamentLobby/generateRegistrationCode';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Team } from '@/types/database';
import { Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import LogoGroup from '../lobby/LogoGroup';

interface Props {
  team: Team;
  setTeam: (team: Team) => void;
  setWarningMessage: (message: string) => void;
}

export const TeamNumber: React.FC<Props> = ({ team, setTeam, setWarningMessage }) => {
  const [registrationNumber, setRegistrationNumber] = useState<string>();
  const router = useRouter();
  const [teamId] = useLocalStorage('teamId', '');
  const [teams, setTeams] = useState<Team[]>();
  const currentTeam = teams?.find((team) => team?.id === teamId);

  const { supabase } = useSupabase<'public'>();

  const onCompanyNumberSubmit = async () => {
    const { data, error } = await supabase
      .from('Team')
      .update({ status: 'active' })
      .eq('id', team.id)
      .select()
      .maybeSingle();
    const { data: tournament, error: tournamentError } = await supabase
      .from('Tournament')
      .select('lobbyCode')
      .eq('id', team.tournamentId)
      .single();
    if (error || !data) {
      setWarningMessage(`Error setting company registration number`);
      return;
    }
    if (tournamentError && !tournament) {
      setWarningMessage(`Error rerouting to tournament lobby`);
      return;
    }

    setTeam(data);
    router.push(`/tournament/${tournament?.lobbyCode}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: allTeams } = await supabase.from('Team').select().eq('tournamentId', team.tournamentId);
      setRegistrationNumber(generateRegistrationCode(allTeams ?? []));
      setTeams(allTeams ?? []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const addRegistration = async () => {
      if (currentTeam && !currentTeam.registrationNumber) {
        const { data, error } = await supabase
          .from('Team')
          .update({ registrationNumber: registrationNumber })
          .eq('id', team.id)
          .select()
          .maybeSingle();
        if (error || !data) {
          setWarningMessage(`Error setting company registration number`);
          return;
        }
      }
    };

    addRegistration();
  }, [registrationNumber, teams]);

  return (
    <div className="w-full flex flex-col items-center gap-24">
      <LogoGroup />
      <div className="w-full flex flex-col items-center gap-20 max-w-3xl">
        <div className="flex flex-col items-center">
          <div className="text-bravo font-heading text-xl flex items-center gap-2">
            <Crown className="w-6 h-6" />
            <span>{team?.name}</span>
          </div>
          <div className="flex flex-col items-center gap-9 text-center">
            <h1 className="font-heading text-5xl text-white leading-snug">
              Congratulations your new firm has been registered.
            </h1>
            <p className="text-xl max-w-2xl">
              Below is your company registration number, <strong className="text-white">write it down</strong> now. Use
              this to log back in if you get disconnected.
            </p>
            <div className="w-full p-6 border-2 border-alpha-light-400 rounded-xl text-2xl font-bold text-white max-w-lg">
              {currentTeam?.registrationNumber ?? registrationNumber ?? '######'}
            </div>
          </div>
        </div>
        <div>
          <button onClick={onCompanyNumberSubmit} className="[ dqButton ] justify-center flex w-full">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
