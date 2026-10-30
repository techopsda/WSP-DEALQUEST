import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { GlobalEvent as GlobalEventType, TeamWithCompanies } from '@/types/database';
import { Fragment, useEffect, useState } from 'react';
import { RoundTextScreen } from '../RoundTextScreen';
import { CompanyCard } from './CompanyCard';

interface GlobalEventDataProps {
  globalEvent: GlobalEventType;
  teamId: string;
}

export const GlobalEventData: React.FC<GlobalEventDataProps> = ({ globalEvent, teamId }) => {
  const [teamCompanies, setTeanCompanies] = useState<TeamWithCompanies[]>([]);
  const { supabase } = useSupabase<'public'>();

  useEffect(() => {
    const getTeamCompanies = async () => {
      const { data: teamCompaniesData } = await supabase
        .from('TeamCompany')
        .select<'teamId,Company(*)', TeamWithCompanies>('teamId,Company(*)')
        .eq('teamId', teamId)
        .is('yearSold', null);
      if (teamCompaniesData) {
        setTeanCompanies((teamCompaniesData as TeamWithCompanies[]) ?? []);
      }
    };
    getTeamCompanies();
  }, []);
  const isRenderCompaniesTrue = globalEvent.type === 'positiveRisk' || globalEvent.type === 'negativeRisk';

  return (
    <div className="flex flex-col items-center gap-12 w-full">
      <RoundTextScreen title={globalEvent.name} isIntro>
        {globalEvent.description}
      </RoundTextScreen>
      {isRenderCompaniesTrue && (
        <div className="max-w-3xl w-full space-y-4">
          {teamCompanies &&
            teamCompanies.map((teamCompany, i) => (
              <Fragment key={i}>
                {teamCompany?.Company && (
                  <CompanyCard company={teamCompany.Company} key={teamCompany.Company.id} type={globalEvent.type} />
                )}
              </Fragment>
            ))}
        </div>
      )}
    </div>
  );
};
