'use client';
import useLocalStorage from '@/components/hooks/useLocalStorage';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Game, Team } from '@/types/database';
import { forwardRef, useEffect } from 'react';
import { CompanyTable } from '../shared/CompanyTable';
import { CompanyWithSectorAndEarnings } from '../shared/companyAccordion/ExtendedCompanyType';
import { getCompaniesWithSlicedEarnings } from '@/lib/shared/getCompaniesWithSlicedEarnings';

interface SellComponentProps {
  companies: CompanyWithSectorAndEarnings[] | null;
  setCompanies: (data: CompanyWithSectorAndEarnings[] | null) => void;
  companiesForSale: CompanyWithSectorAndEarnings[];
  onCompanyListedForSale: (company: CompanyWithSectorAndEarnings) => unknown;
  team: Team;
  game: Game;
}

export const SellComponent: React.FC<SellComponentProps> = forwardRef(
  ({ companies, setCompanies, companiesForSale, onCompanyListedForSale, team, game }, ref) => {
    const { supabase } = useSupabase<'public'>();
    const [teamId] = useLocalStorage('teamId', '');

    useEffect(() => {
      const getCompanies = async () => {
        const { data, error } = await supabase
          .from('TeamCompany')
          .select<'Company(*, Sector(*), Earnings(*))', CompanyWithSectorAndEarnings>(
            'Company(*, Sector(*), Earnings(*))'
          )
          .eq('teamId', teamId)
          .is('yearSold', null);

        setCompanies(data);
      };
      getCompanies();
    }, []);

    return (
      <div className="max-w-7xl w-full flex flex-col gap-6 pb-12">
        {companies && companies?.length > 0 && (
          <CompanyTable
            companiesToDisplay={getCompaniesWithSlicedEarnings(companies, game.year)}
            game={game}
            hiddenKeys={['Sector']}
            extraColumns={[
              {
                header: 'Sell',
                content: (company) => (
                  <button
                    className="[ dqSecondaryButton ]"
                    onClick={() => onCompanyListedForSale(company as CompanyWithSectorAndEarnings)}
                  >
                    {companiesForSale.find((forSale) => forSale?.Company?.id === company?.Company?.id)
                      ? 'delist sale'
                      : 'list for sale'}
                  </button>
                )
              }
            ]}
          />
        )}
        {!companies ||
          (companies?.length < 1 && (
            <p className="text-center text-2xl font-medium text-white">
              <strong className="text-bravo font-semibold">{team.name}</strong> does not own any companies
            </p>
          ))}
      </div>
    );
  }
);
