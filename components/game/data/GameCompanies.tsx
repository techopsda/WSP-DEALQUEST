'use client';

import { Team, TeamWithCompanies } from '@/types/database';
import { TeamCompanies } from './TeamCompaniesSidebar/TeamCompanies';

interface Props {
  team: Team;
  companies: TeamWithCompanies[];
}

export const GameCompanies: React.FC<Props> = ({ team, companies }) => {
  return (
    <ul className="flex flex-col gap-6">
      {companies.length > 0 ? (
        <TeamCompanies companies={companies} />
      ) : (
        <li className="">
          <p className="text-white">
            Sorry, <strong className="text-bravo">{team.name}</strong> does not own any companies, yet.
          </p>
        </li>
      )}
    </ul>
  );
};
