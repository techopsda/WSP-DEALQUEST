import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Game, Team, TeamCompany } from '@/types/database';
import { useEffect, useState } from 'react';
import { CompanyWithSectorAndEarnings } from '../shared/companyAccordion/ExtendedCompanyType';

export const useAuctionCompanyData = (game: Game, team: Team) => {
  const [isLoading, setIsLoading] = useState(true);
  const [companiesObject, setCompaniesObject] = useState<{
    companies: CompanyWithSectorAndEarnings[];
    teamCompanies?: TeamCompany[];
  }>();

  const { supabase } = useSupabase<'public'>();

  useEffect(() => {
    const fetchAuctionsWithCompanies = async () => {
      const { data } = await supabase
        .from('Auction')
        .select('Company(*, Sector(*), Earnings(*))')
        .eq('gameId', game.id)
        .eq('year', game.year);

      setCompaniesObject({ companies: data ?? [] });

      setIsLoading(false);
    };

    fetchAuctionsWithCompanies();
  }, [game]);

  return { isLoading, companiesObject };
};
