import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { TeamWithCompaniesEarningsAndSector } from '@/types/database';
import { useEffect, useState } from 'react';

export const useTeamCompanies = (teamId: string, gameYear: number) => {
  const [teamCompanies, setTeamCompanies] = useState<TeamWithCompaniesEarningsAndSector[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { supabase } = useSupabase<'public'>();

  useEffect(() => {
    const fetchTeamCompaniesData = async () => {
      const { data: TeamCompanies } = await supabase
        .from('TeamCompany')
        .select('*, Company(*, Earnings(*), Sector(*))')
        .eq('teamId', teamId)
        .is('yearSold', null)
        .lte('Company.Earnings.year', gameYear)
        .gte('Company.Earnings.year', 0);

      setTeamCompanies(TeamCompanies ?? []);
      setIsLoading(false);
    };
    fetchTeamCompaniesData();
  }, []);

  return { isLoading, teamCompanies };
};
