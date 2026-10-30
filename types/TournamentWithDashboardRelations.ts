import { BalanceSheet, Company, Member, Team, TeamCompany } from './database';

export type TournamentWithDashboardRelations = {
  Team: TeamWithDashboardRelations[];
  id: string;
};

export type TeamWithDashboardRelations = Team & {
  Member: Member[];
  TeamCompany: TeamCompanyWithCompanies[];
  BalanceSheet: BalanceSheet[];
};

export type TeamCompanyWithCompanies = TeamCompany & {
  Company: Company;
  teamId: string;
};
