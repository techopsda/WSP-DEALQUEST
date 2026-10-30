import { Game, TeamWithCompaniesEarningsAndSector } from '@/types/database';
import _ from 'lodash';
import { getCurrentEarnings } from './TeamCompanies/getEarningsForCurrentYear';
import { RoundTextScreen } from '../RoundTextScreen';
import { Joyride as ReactJoyride } from 'react-joyride';
import { TooltipComponent } from '@/components/shared/TooltipComponent';
import { getTooltips } from '@/lib/shared/getTooltips';

interface CompanyEarningsProps {
  game: Game;
  teamCompanies: TeamWithCompaniesEarningsAndSector[];
}

export const CompanyEarnings: React.FC<CompanyEarningsProps> = ({ teamCompanies, game }) => {
  const steps = getTooltips(game.periodType, game.year);
  return (
    <>
      <ReactJoyride
        run={game.year === 0}
        steps={steps ?? []}

        tooltipComponent={TooltipComponent}
      />
      <div className="grow flex items-center">
        <RoundTextScreen title="Company Earnings" isIntro>
          <p id="companyEarningsHeader">Let's see how your companies have performed this year&hellip;</p>
          <div id="companyEarningsTable" className="flex flex-col gap-6">
            {teamCompanies &&
              teamCompanies.map((teamCompany) => (
                <div
                  className="border-2 border-alpha-light-800 p-6 w-full rounded-xl flex items-center justify-between gap-6 my-6"
                  key={teamCompany.id}
                >
                  <div className="flex flex-col gap-3">
                    {/* Company name */}
                    <h2 className="text-2xl font-semibold text-alpha-light-100">{teamCompany?.Company?.name}</h2>
                  </div>
                  {/* outcome of event */}
                  <p className="text-xl font-semibold text-success-light">
                    +${getCurrentEarnings(teamCompany?.Company?.Earnings ?? [], game.year)}m EBIT
                  </p>
                </div>
              ))}
          </div>
        </RoundTextScreen>
      </div>
    </>
  );
};
