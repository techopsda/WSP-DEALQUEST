'use client';

import useLocalStorage from '@/components/hooks/useLocalStorage';
import { TeamMembers } from '@/components/teamSetup/TeamMembers';
import { TeamName } from '@/components/teamSetup/TeamName';
import { TeamNumber } from '@/components/teamSetup/TeamNumber';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Team } from '@/types/database';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TeamSetup = () => {
  const [teamId] = useLocalStorage('teamId', '');
  const [team, setTeam] = useState<Team | null>(null);
  const [warningMessage, setWarningMessage] = useState('');
  const router = useRouter();
  const { supabase } = useSupabase<'public'>();

  useEffect(() => {
    const fetchData = async () => {
      const { data: teamData } = await supabase.from('Team').select().eq('id', teamId).maybeSingle();
      setTeam(teamData);
    };
    if (!teamId) {
      redirect('/');
    }

    fetchData();
  }, []);

  if (!team) return null;
  return (
    <div className="flex flex-col items-center">
      {team.status === 'awaitingTeamName' && (
        <TeamName team={team} setTeam={setTeam} setWarningMessage={setWarningMessage} />
      )}
      {team.status === 'awaitingTeamMembers' && (
        <TeamMembers team={team} setTeam={setTeam} setWarningMessage={setWarningMessage} />
      )}
      {team.status === 'awaitingRegistrationCode' && (
        <TeamNumber team={team} setTeam={setTeam} setWarningMessage={setWarningMessage} />
      )}
      <span className="flex justify-center text-white">{warningMessage}</span>
    </div>
  );
};

export default TeamSetup;
