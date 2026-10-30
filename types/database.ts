import { TeamWithBalanceSheetDataAndMembers } from '@/components/game/yearEnd/useBalanceSheetAndCompanies';
import { LegacyRef } from 'react';
import { Database } from './supabase';

export type Team = Database['public']['Tables']['Team']['Row'];
export type JobTitle = Database['public']['Tables']['JobTitle']['Row'];
export type Tournament = Database['public']['Tables']['Tournament']['Row'];
export type Member = Database['public']['Tables']['Member']['Row'];
export type Company = Database['public']['Tables']['Company']['Row'];
export type TeamCompany = Database['public']['Tables']['TeamCompany']['Row'];
export type Game = Database['public']['Tables']['Game']['Row'];
export type User = Database['access']['Tables']['User']['Row'];
export type Earnings = Database['public']['Tables']['Earnings']['Row'];
export type Sector = Database['public']['Tables']['Sector']['Row'];
export type Bid = Database['public']['Tables']['Bid']['Row'];
export type BalanceSheet = Database['public']['Tables']['BalanceSheet']['Row'];
export type LocalEvent = Database['public']['Tables']['LocalEvent']['Row'];
export type LocalEventType = Database['public']['Enums']['LocalEventType'];
export type GlobalEventTypeEnum = Database['public']['Enums']['GlobalEventType'];
export type GameStatusEnum = Database['public']['Enums']['GameStatus'];
export type Period = Database['public']['Tables']['Period']['Row'];
export type NotificationTypeEnum = Database['public']['Enums']['NotificationType'];
export type Notification = Database['public']['Tables']['Notification']['Row'];
export type Auction = Database['public']['Tables']['Auction']['Row'];
export type GlobalEvent = Database['public']['Tables']['GlobalEvent']['Row'];
export type Finance = Database['public']['Tables']['Finance']['Row'];
export type Question = Database['public']['Tables']['Question']['Row'];
export type QuestionTypeEnum = Database['public']['Enums']['QuestionType'];
export type Answer = Database['public']['Tables']['Answer']['Row'];
export type TeamQuestion = Database['public']['Tables']['TeamQuestion']['Row'];
export type GamePeriodEnum = Database['public']['Enums']['PeriodType'];
export type TeamLocalEvent = Database['public']['Tables']['TeamLocalEvent']['Row'];
export type PeriodTypeEnum = Database['public']['Enums']['PeriodType'];
export type AccountsSheet = Database['public']['Tables']['AccountsSheet']['Row'];
export type TeamStatus = Database['public']['Enums']['TeamStatus'];

export type TeamLocalEventWithLocalEvent = TeamLocalEvent & {
  LocalEvent: LocalEvent;
};

export type NotificationToInsert = Pick<Notification, 'message' | 'type' | 'year' | 'stage' | 'teamId'>;

export type MemberWithJobTitle = Member & {
  jobTitle: JobTitle | null;
};

export type CompanyWithTeamId = Company & {
  teamId: string;
};

export type TeamMember = Team & {
  Member: Member[];
};

export type InsertPeriod = {
  year: number;
  periodOrder: number;
  type: string;
  startTime?: Date;
  endTime?: Date;
  gameId: string;
  periodLength: number;
  stage: number;
};

export type BidsWithCompaniesAndTeam =
  | (Bid & {
      Team: { id: string; name: string | null; Member: Member[] } | null;
      Company: { id: string; name: string } | null;
      Auction: { lot: number } | null;
    })
  | null;

export type TeamWithCompanies = {
  companyId: string;
  id: string;
  teamId: string;
  yearBought: number;
  yearSold: number | null;
  Company: Company | null;
};

export type TeamWithBalanceSheetData = BalanceSheet & {
  Team: { name: string };
};

export type TeamIdWithCompany = {
  teamId: string;
  Company: Company;
};

export type TeamWithCompaniesEarningsAndSector = TeamCompany & {
  Company: (Company & { Earnings: Earnings[]; Sector: Sector | null }) | null;
};

export type InputAccounting = {
  consolidatedEBIT?: number;
  localEvent?: number;
  globalEvent?: number;
  interest?: number;
  netIncomeStatement?: number;
  beginningEquity?: number;
  roundFundingEquity?: number;
  quizFundingEquity?: number;
  netIncomeEquity?: number;
  equitySubtotal?: number;
  beginningCash?: number;
  roundFundingCash?: number;
  quizFundingCash?: number;
  debtIssuance?: number;
  cashAuction?: number;
  cashAuctionSpent?: number;
  netIncomeCash?: number;
  cashSubtotal?: number;
};

export type TeamsForFinalLeaderboard = {
  third: TeamWithBalanceSheetDataAndMembers[];
  second: TeamWithBalanceSheetDataAndMembers[];
  first: TeamWithBalanceSheetDataAndMembers[];
};

export type TeamQuestionsWithAnswers = TeamQuestion & {
  Question: (Question & { Answer: Answer[] }) | null;
};

export type TeamQuestionWithQuestion = TeamQuestion & {
  Question: Question | null;
};

export type RefButtonType = LegacyRef<HTMLButtonElement> | undefined;

export type interestRateSetting = { rate: number };
