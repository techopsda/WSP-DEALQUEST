import { Game, TeamWithCompaniesEarningsAndSector } from '@/types/database';
import { forwardRef } from 'react';
import { CompanyTable } from '../../shared/CompanyTable';

interface AccountingCompaniesTabProps {
  teamCompanies: TeamWithCompaniesEarningsAndSector[];
  game: Game;
}

export const AccountingCompaniesTab: React.FC<AccountingCompaniesTabProps> = forwardRef(
  ({ teamCompanies, game }, ref) => {
    return (
      <div className="w-full flex flex-col items-center gap-12 max-w-7xl">
        <p className="text-2xl text-center">This is how your companies have actually performed:</p>
        {teamCompanies && teamCompanies?.length > 0 && (
          <CompanyTable
            companiesToDisplay={teamCompanies}
            game={game}
            hiddenKeys={['reserve', 'risk', 'Sector', 'salePrice']}
            isAccountingStage={game.stage === 8}
          />
        )}
      </div>
    );
  }
);
