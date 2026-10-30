import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Team } from '@/types/database';
import { useEffect, useState } from 'react';

const useTeam: (teamId?: string) => { isLoading: boolean; team: Team | null; error: string | null } = (
  teamId?: string
) => {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { supabase } = useSupabase<'public'>();

  useEffect(() => {
    const getTeam = async () => {
      if (teamId) {
        const { data, error } = await supabase.from('Team').select().eq('id', teamId).single();

        if (error && !data) {
          setError(error.message);
        }

        if (!error && data) {
          setTeam(data);
        }
      } else {
        setError('No teamId');
      }

      setLoading(false);
    };
    getTeam();
  }, [teamId]);

  return { isLoading: loading, team: team, error: error };
};

export default useTeam;
