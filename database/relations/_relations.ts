// Access
import { Relation } from './types/Relation';
import { User_Organisation } from './access/User_Organisation';
import { Organisation_Organisation } from './access/Organisation_Organisation';
import { UserOrganisation_Role } from './access/UserOrganisation_Role';
import { Role_Permission } from './access/Role_Permission';
import { Finance } from './public/Finance';
import { TeamCompany_Team } from './public/TeamCompany_Team';
import { Company } from './public/Company';
import { Member_JobTitle } from './public/Member_JobTitle';
import { Member_Team } from './public/Member_Team';
import { Bid_Company } from './public/Bid_Company';
import { Bid_Team } from './public/Bid_Team';
import { Auction_Company } from './public/Auction_Company';
import { Auction_Game } from './public/Auction_Game';
import { Bid_Auction } from './public/Bid_Auction';
import { Game } from './public/Game';
import { Team_Tournament } from './public/Team_Tournament';
import { Team_Game } from './public/Team_Game';
import { BalanceSheet } from './public/BalanceSheet';
import { Notification_Game } from './public/Notification_Game';
import { Notification_Team } from './public/Notification_Team';
import { Earnings } from './public/Earnings';
import { Answer } from './public/Answer';
import { TeamCompany_Company } from './public/TeamCompany_Company';
import { Question } from './public/Question';
import { TeamQuestion_Answer } from './public/TeamQuestion_Answer';
import { Team_Question } from './public/Team_Question';
import { Bid_Game } from './public/Bid_Game';
import { Game_Period } from './public/Game_Period';
import { Team_LocalEvent } from './public/Team_LocalEvent';
import { User_Role } from './access/User_Role';
import { Team_AccountsSheet } from './public/Team_AccountsSheet';

export const relations: Relation[] = [
  // Access
  ...User_Organisation,
  ...Organisation_Organisation,
  ...UserOrganisation_Role,
  ...Role_Permission,
  ...User_Role,
  // Public
  ...Answer,
  ...Auction_Company,
  ...Auction_Game,
  ...BalanceSheet,
  ...Bid_Auction,
  ...Bid_Company,
  ...Bid_Game,
  ...Bid_Team,
  ...Bid_Game,
  ...Company,
  ...Earnings,
  ...Finance,
  ...Game,
  ...Game_Period,
  ...Member_JobTitle,
  ...Member_Team,
  ...Notification_Game,
  ...Notification_Team,
  ...Question,
  ...Team_Game,
  ...Team_Question,
  ...Team_Tournament,
  ...TeamCompany_Company,
  ...TeamCompany_Team,
  ...TeamQuestion_Answer,
  ...Team_LocalEvent,
  ...Team_AccountsSheet
];

export const createdModifiedModels: Record<string, string[]> = {
  access: [
    'Organisation',
    'Permission',
    'Role',
    'RolePermission',
    'UserOrganisation',
    'UserRole',
    'UserOrganisationRole'
  ],
  public: ['Tournament', 'TeamQuestion', 'Bid', 'Notification']
};
