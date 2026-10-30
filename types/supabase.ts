export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  access: {
    Tables: {
      Organisation: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          name: string;
          parentId: string | null;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name: string;
          parentId?: string | null;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name?: string;
          parentId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Organisation_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Organisation_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Organisation_parentId_fkey';
            columns: ['parentId'];
            referencedRelation: 'Organisation';
            referencedColumns: ['id'];
          }
        ];
      };
      Permission: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          name: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Permission_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Permission_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          }
        ];
      };
      Role: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          name: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Role_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Role_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          }
        ];
      };
      RolePermission: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          permissionId: string;
          roleId: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          permissionId: string;
          roleId: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          permissionId?: string;
          roleId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'RolePermission_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'RolePermission_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'RolePermission_permissionId_fkey';
            columns: ['permissionId'];
            referencedRelation: 'Permission';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'RolePermission_roleId_fkey';
            columns: ['roleId'];
            referencedRelation: 'Role';
            referencedColumns: ['id'];
          }
        ];
      };
      User: {
        Row: {
          email: string;
          firstName: string | null;
          id: string;
          lastName: string | null;
          metadata: Json | null;
        };
        Insert: {
          email: string;
          firstName?: string | null;
          id?: string;
          lastName?: string | null;
          metadata?: Json | null;
        };
        Update: {
          email?: string;
          firstName?: string | null;
          id?: string;
          lastName?: string | null;
          metadata?: Json | null;
        };
        Relationships: [];
      };
      UserOrganisation: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          organisationId: string;
          userId: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          organisationId: string;
          userId: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          organisationId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'UserOrganisation_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserOrganisation_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserOrganisation_organisationId_fkey';
            columns: ['organisationId'];
            referencedRelation: 'Organisation';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserOrganisation_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          }
        ];
      };
      UserOrganisationRole: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          roleId: string;
          userOrganisationId: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          roleId: string;
          userOrganisationId: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          roleId?: string;
          userOrganisationId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'UserOrganisationRole_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserOrganisationRole_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserOrganisationRole_roleId_fkey';
            columns: ['roleId'];
            referencedRelation: 'Role';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserOrganisationRole_userOrganisationId_fkey';
            columns: ['userOrganisationId'];
            referencedRelation: 'UserOrganisation';
            referencedColumns: ['id'];
          }
        ];
      };
      UserRole: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          roleId: string;
          userId: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          roleId: string;
          userId: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          roleId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'UserRole_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserRole_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserRole_roleId_fkey';
            columns: ['roleId'];
            referencedRelation: 'Role';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'UserRole_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_access_claim: {
        Args: {
          uid: string;
        };
        Returns: Json;
      };
      get_access_claim_global: {
        Args: {
          uid: string;
        };
        Returns: Json;
      };
      get_access_claim_org: {
        Args: {
          uid: string;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      AccountsSheet: {
        Row: {
          accountingInputs: Json | null;
          cash: boolean | null;
          equity: boolean | null;
          id: string;
          netIncome: boolean | null;
          teamId: string;
          year: number;
        };
        Insert: {
          accountingInputs?: Json | null;
          cash?: boolean | null;
          equity?: boolean | null;
          id?: string;
          netIncome?: boolean | null;
          teamId: string;
          year: number;
        };
        Update: {
          accountingInputs?: Json | null;
          cash?: boolean | null;
          equity?: boolean | null;
          id?: string;
          netIncome?: boolean | null;
          teamId?: string;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'AccountsSheet_teamId_fkey';
            columns: ['teamId'];
            referencedRelation: 'Team';
            referencedColumns: ['id'];
          }
        ];
      };
      Answer: {
        Row: {
          answer: string;
          id: string;
          questionId: string;
        };
        Insert: {
          answer: string;
          id?: string;
          questionId: string;
        };
        Update: {
          answer?: string;
          id?: string;
          questionId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Answer_questionId_fkey';
            columns: ['questionId'];
            referencedRelation: 'Question';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Answer_questionId_fkey';
            columns: ['questionId'];
            referencedRelation: 'question_random_view';
            referencedColumns: ['id'];
          }
        ];
      };
      Auction: {
        Row: {
          active: boolean;
          auctionEndTime: string | null;
          auctionStartTime: string | null;
          companyId: string;
          gameId: string;
          id: string;
          lot: number;
          sold: boolean;
          year: number;
        };
        Insert: {
          active: boolean;
          auctionEndTime?: string | null;
          auctionStartTime?: string | null;
          companyId: string;
          gameId: string;
          id?: string;
          lot: number;
          sold?: boolean;
          year: number;
        };
        Update: {
          active?: boolean;
          auctionEndTime?: string | null;
          auctionStartTime?: string | null;
          companyId?: string;
          gameId?: string;
          id?: string;
          lot?: number;
          sold?: boolean;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'Auction_companyId_fkey';
            columns: ['companyId'];
            referencedRelation: 'Company';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Auction_companyId_fkey';
            columns: ['companyId'];
            referencedRelation: 'company_random_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Auction_gameId_fkey';
            columns: ['gameId'];
            referencedRelation: 'Game';
            referencedColumns: ['id'];
          }
        ];
      };
      BalanceSheet: {
        Row: {
          auctionSpendings: number | null;
          cash: number;
          debt: number;
          equity: number;
          financingFund: number | null;
          globalEventFund: number | null;
          id: string;
          localEventFund: number | null;
          maxDebtFine: number | null;
          quizFund: number | null;
          roundFund: number | null;
          teamId: string;
          year: number;
        };
        Insert: {
          auctionSpendings?: number | null;
          cash: number;
          debt: number;
          equity: number;
          financingFund?: number | null;
          globalEventFund?: number | null;
          id?: string;
          localEventFund?: number | null;
          maxDebtFine?: number | null;
          quizFund?: number | null;
          roundFund?: number | null;
          teamId: string;
          year: number;
        };
        Update: {
          auctionSpendings?: number | null;
          cash?: number;
          debt?: number;
          equity?: number;
          financingFund?: number | null;
          globalEventFund?: number | null;
          id?: string;
          localEventFund?: number | null;
          maxDebtFine?: number | null;
          quizFund?: number | null;
          roundFund?: number | null;
          teamId?: string;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'BalanceSheet_teamId_fkey';
            columns: ['teamId'];
            referencedRelation: 'Team';
            referencedColumns: ['id'];
          }
        ];
      };
      Bid: {
        Row: {
          amount: number;
          auctionId: string;
          companyId: string;
          createdAt: string | null;
          createdById: string | null;
          gameId: string;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          teamId: string;
        };
        Insert: {
          amount: number;
          auctionId: string;
          companyId: string;
          createdAt?: string | null;
          createdById?: string | null;
          gameId: string;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          teamId: string;
        };
        Update: {
          amount?: number;
          auctionId?: string;
          companyId?: string;
          createdAt?: string | null;
          createdById?: string | null;
          gameId?: string;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          teamId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Bid_auctionId_fkey';
            columns: ['auctionId'];
            referencedRelation: 'Auction';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Bid_companyId_fkey';
            columns: ['companyId'];
            referencedRelation: 'Company';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Bid_companyId_fkey';
            columns: ['companyId'];
            referencedRelation: 'company_random_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Bid_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Bid_gameId_fkey';
            columns: ['gameId'];
            referencedRelation: 'Game';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Bid_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Bid_teamId_fkey';
            columns: ['teamId'];
            referencedRelation: 'Team';
            referencedColumns: ['id'];
          }
        ];
      };
      Company: {
        Row: {
          id: string;
          name: string;
          reserve: number;
          risk: number;
          salePrice: number;
          sectorId: string;
          year: number;
        };
        Insert: {
          id?: string;
          name: string;
          reserve: number;
          risk: number;
          salePrice: number;
          sectorId: string;
          year: number;
        };
        Update: {
          id?: string;
          name?: string;
          reserve?: number;
          risk?: number;
          salePrice?: number;
          sectorId?: string;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'Company_sectorId_fkey';
            columns: ['sectorId'];
            referencedRelation: 'Sector';
            referencedColumns: ['id'];
          }
        ];
      };
      Earnings: {
        Row: {
          amount: number;
          companyId: string;
          id: string;
          year: number;
        };
        Insert: {
          amount: number;
          companyId: string;
          id?: string;
          year: number;
        };
        Update: {
          amount?: number;
          companyId?: string;
          id?: string;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'Earnings_companyId_fkey';
            columns: ['companyId'];
            referencedRelation: 'Company';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Earnings_companyId_fkey';
            columns: ['companyId'];
            referencedRelation: 'company_random_view';
            referencedColumns: ['id'];
          }
        ];
      };
      Finance: {
        Row: {
          amountBorrowed: number | null;
          amountDebtPaid: number | null;
          amountIncomeSale: number | null;
          id: string;
          teamId: string;
          year: number;
        };
        Insert: {
          amountBorrowed?: number | null;
          amountDebtPaid?: number | null;
          amountIncomeSale?: number | null;
          id?: string;
          teamId: string;
          year: number;
        };
        Update: {
          amountBorrowed?: number | null;
          amountDebtPaid?: number | null;
          amountIncomeSale?: number | null;
          id?: string;
          teamId?: string;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'Finance_teamId_fkey';
            columns: ['teamId'];
            referencedRelation: 'Team';
            referencedColumns: ['id'];
          }
        ];
      };
      Game: {
        Row: {
          id: string;
          period: number;
          periodType: Database['public']['Enums']['PeriodType'];
          stage: number;
          stageEndTime: string | null;
          stagePausedTime: string | null;
          stageStartTime: string | null;
          status: Database['public']['Enums']['GameStatus'];
          tournamentId: string;
          year: number;
        };
        Insert: {
          id?: string;
          period?: number;
          periodType?: Database['public']['Enums']['PeriodType'];
          stage: number;
          stageEndTime?: string | null;
          stagePausedTime?: string | null;
          stageStartTime?: string | null;
          status?: Database['public']['Enums']['GameStatus'];
          tournamentId: string;
          year: number;
        };
        Update: {
          id?: string;
          period?: number;
          periodType?: Database['public']['Enums']['PeriodType'];
          stage?: number;
          stageEndTime?: string | null;
          stagePausedTime?: string | null;
          stageStartTime?: string | null;
          status?: Database['public']['Enums']['GameStatus'];
          tournamentId?: string;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'Game_tournamentId_fkey';
            columns: ['tournamentId'];
            referencedRelation: 'Tournament';
            referencedColumns: ['id'];
          }
        ];
      };
      GlobalEvent: {
        Row: {
          description: string;
          id: string;
          name: string;
          orderNo: number;
          type: Database['public']['Enums']['GlobalEventType'];
        };
        Insert: {
          description: string;
          id?: string;
          name: string;
          orderNo: number;
          type: Database['public']['Enums']['GlobalEventType'];
        };
        Update: {
          description?: string;
          id?: string;
          name?: string;
          orderNo?: number;
          type?: Database['public']['Enums']['GlobalEventType'];
        };
        Relationships: [];
      };
      JobTitle: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      LocalEvent: {
        Row: {
          description: string;
          id: string;
          name: string;
          output: string;
          type: Database['public']['Enums']['LocalEventType'];
        };
        Insert: {
          description: string;
          id?: string;
          name: string;
          output: string;
          type: Database['public']['Enums']['LocalEventType'];
        };
        Update: {
          description?: string;
          id?: string;
          name?: string;
          output?: string;
          type?: Database['public']['Enums']['LocalEventType'];
        };
        Relationships: [];
      };
      Member: {
        Row: {
          id: string;
          jobTitleId: string;
          name: string;
          teamId: string;
        };
        Insert: {
          id?: string;
          jobTitleId: string;
          name: string;
          teamId: string;
        };
        Update: {
          id?: string;
          jobTitleId?: string;
          name?: string;
          teamId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Member_jobTitleId_fkey';
            columns: ['jobTitleId'];
            referencedRelation: 'JobTitle';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Member_teamId_fkey';
            columns: ['teamId'];
            referencedRelation: 'Team';
            referencedColumns: ['id'];
          }
        ];
      };
      Notification: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          gameId: string | null;
          id: string;
          message: Json;
          modifiedAt: string | null;
          modifiedById: string | null;
          stage: number;
          teamId: string | null;
          type: Database['public']['Enums']['NotificationType'];
          year: number;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          gameId?: string | null;
          id?: string;
          message: Json;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          stage: number;
          teamId?: string | null;
          type: Database['public']['Enums']['NotificationType'];
          year: number;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          gameId?: string | null;
          id?: string;
          message?: Json;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          stage?: number;
          teamId?: string | null;
          type?: Database['public']['Enums']['NotificationType'];
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'Notification_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Notification_gameId_fkey';
            columns: ['gameId'];
            referencedRelation: 'Game';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Notification_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Notification_teamId_fkey';
            columns: ['teamId'];
            referencedRelation: 'Team';
            referencedColumns: ['id'];
          }
        ];
      };
      Period: {
        Row: {
          gameId: string;
          id: string;
          periodLength: number;
          periodOrder: number;
          stage: number;
          type: Database['public']['Enums']['PeriodType'];
          year: number;
        };
        Insert: {
          gameId: string;
          id?: string;
          periodLength: number;
          periodOrder: number;
          stage: number;
          type: Database['public']['Enums']['PeriodType'];
          year: number;
        };
        Update: {
          gameId?: string;
          id?: string;
          periodLength?: number;
          periodOrder?: number;
          stage?: number;
          type?: Database['public']['Enums']['PeriodType'];
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'Period_gameId_fkey';
            columns: ['gameId'];
            referencedRelation: 'Game';
            referencedColumns: ['id'];
          }
        ];
      };
      Question: {
        Row: {
          correctAnswerId: string | null;
          id: string;
          metadata: Json | null;
          name: string;
          type: Database['public']['Enums']['QuestionType'];
          year: number;
        };
        Insert: {
          correctAnswerId?: string | null;
          id?: string;
          metadata?: Json | null;
          name: string;
          type?: Database['public']['Enums']['QuestionType'];
          year: number;
        };
        Update: {
          correctAnswerId?: string | null;
          id?: string;
          metadata?: Json | null;
          name?: string;
          type?: Database['public']['Enums']['QuestionType'];
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'Question_correctAnswerId_fkey';
            columns: ['correctAnswerId'];
            referencedRelation: 'Answer';
            referencedColumns: ['id'];
          }
        ];
      };
      Sector: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      Setting: {
        Row: {
          id: string;
          key: string;
          value: Json;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
        };
        Relationships: [];
      };
      Team: {
        Row: {
          gameId: string | null;
          gameRating: number | null;
          id: string;
          name: string | null;
          registrationNumber: string | null;
          status: Database['public']['Enums']['TeamStatus'];
          tournamentId: string;
        };
        Insert: {
          gameId?: string | null;
          gameRating?: number | null;
          id?: string;
          name?: string | null;
          registrationNumber?: string | null;
          status: Database['public']['Enums']['TeamStatus'];
          tournamentId: string;
        };
        Update: {
          gameId?: string | null;
          gameRating?: number | null;
          id?: string;
          name?: string | null;
          registrationNumber?: string | null;
          status?: Database['public']['Enums']['TeamStatus'];
          tournamentId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Team_gameId_fkey';
            columns: ['gameId'];
            referencedRelation: 'Game';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Team_tournamentId_fkey';
            columns: ['tournamentId'];
            referencedRelation: 'Tournament';
            referencedColumns: ['id'];
          }
        ];
      };
      TeamCompany: {
        Row: {
          companyId: string;
          id: string;
          teamId: string;
          yearBought: number;
          yearSold: number | null;
        };
        Insert: {
          companyId: string;
          id?: string;
          teamId: string;
          yearBought: number;
          yearSold?: number | null;
        };
        Update: {
          companyId?: string;
          id?: string;
          teamId?: string;
          yearBought?: number;
          yearSold?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'TeamCompany_companyId_fkey';
            columns: ['companyId'];
            referencedRelation: 'Company';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'TeamCompany_companyId_fkey';
            columns: ['companyId'];
            referencedRelation: 'company_random_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'TeamCompany_teamId_fkey';
            columns: ['teamId'];
            referencedRelation: 'Team';
            referencedColumns: ['id'];
          }
        ];
      };
      TeamLocalEvent: {
        Row: {
          cardSelected: number | null;
          id: string;
          localEventId: string;
          teamId: string;
          year: number;
        };
        Insert: {
          cardSelected?: number | null;
          id?: string;
          localEventId: string;
          teamId: string;
          year: number;
        };
        Update: {
          cardSelected?: number | null;
          id?: string;
          localEventId?: string;
          teamId?: string;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'TeamLocalEvent_localEventId_fkey';
            columns: ['localEventId'];
            referencedRelation: 'LocalEvent';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'TeamLocalEvent_localEventId_fkey';
            columns: ['localEventId'];
            referencedRelation: 'localevent_random_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'TeamLocalEvent_teamId_fkey';
            columns: ['teamId'];
            referencedRelation: 'Team';
            referencedColumns: ['id'];
          }
        ];
      };
      TeamQuestion: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          id: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          orderNumber: number | null;
          questionId: string;
          selectedAnswerId: string | null;
          teamId: string;
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          orderNumber?: number | null;
          questionId: string;
          selectedAnswerId?: string | null;
          teamId: string;
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          id?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          orderNumber?: number | null;
          questionId?: string;
          selectedAnswerId?: string | null;
          teamId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'TeamQuestion_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'TeamQuestion_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'TeamQuestion_questionId_fkey';
            columns: ['questionId'];
            referencedRelation: 'Question';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'TeamQuestion_questionId_fkey';
            columns: ['questionId'];
            referencedRelation: 'question_random_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'TeamQuestion_selectedAnswerId_fkey';
            columns: ['selectedAnswerId'];
            referencedRelation: 'Answer';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'TeamQuestion_teamId_fkey';
            columns: ['teamId'];
            referencedRelation: 'Team';
            referencedColumns: ['id'];
          }
        ];
      };
      Tournament: {
        Row: {
          createdAt: string | null;
          createdById: string | null;
          finalYear: number | null;
          id: string;
          instructorName: string | null;
          lobbyCode: string;
          modifiedAt: string | null;
          modifiedById: string | null;
          practiceRound: boolean;
          status: Database['public']['Enums']['TournamentStatus'];
        };
        Insert: {
          createdAt?: string | null;
          createdById?: string | null;
          finalYear?: number | null;
          id?: string;
          instructorName?: string | null;
          lobbyCode: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          practiceRound: boolean;
          status?: Database['public']['Enums']['TournamentStatus'];
        };
        Update: {
          createdAt?: string | null;
          createdById?: string | null;
          finalYear?: number | null;
          id?: string;
          instructorName?: string | null;
          lobbyCode?: string;
          modifiedAt?: string | null;
          modifiedById?: string | null;
          practiceRound?: boolean;
          status?: Database['public']['Enums']['TournamentStatus'];
        };
        Relationships: [
          {
            foreignKeyName: 'Tournament_createdById_fkey';
            columns: ['createdById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Tournament_modifiedById_fkey';
            columns: ['modifiedById'];
            referencedRelation: 'User';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      company_random_view: {
        Row: {
          id: string | null;
          name: string | null;
          reserve: number | null;
          risk: number | null;
          salePrice: number | null;
          sectorId: string | null;
          year: number | null;
        };
        Insert: {
          id?: string | null;
          name?: string | null;
          reserve?: number | null;
          risk?: number | null;
          salePrice?: number | null;
          sectorId?: string | null;
          year?: number | null;
        };
        Update: {
          id?: string | null;
          name?: string | null;
          reserve?: number | null;
          risk?: number | null;
          salePrice?: number | null;
          sectorId?: string | null;
          year?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Company_sectorId_fkey';
            columns: ['sectorId'];
            referencedRelation: 'Sector';
            referencedColumns: ['id'];
          }
        ];
      };
      localevent_random_view: {
        Row: {
          description: string | null;
          id: string | null;
          name: string | null;
          output: string | null;
          type: Database['public']['Enums']['LocalEventType'] | null;
        };
        Insert: {
          description?: string | null;
          id?: string | null;
          name?: string | null;
          output?: string | null;
          type?: Database['public']['Enums']['LocalEventType'] | null;
        };
        Update: {
          description?: string | null;
          id?: string | null;
          name?: string | null;
          output?: string | null;
          type?: Database['public']['Enums']['LocalEventType'] | null;
        };
        Relationships: [];
      };
      question_random_view: {
        Row: {
          correctAnswerId: string | null;
          id: string | null;
          metadata: Json | null;
          name: string | null;
          type: Database['public']['Enums']['QuestionType'] | null;
          year: number | null;
        };
        Insert: {
          correctAnswerId?: string | null;
          id?: string | null;
          metadata?: Json | null;
          name?: string | null;
          type?: Database['public']['Enums']['QuestionType'] | null;
          year?: number | null;
        };
        Update: {
          correctAnswerId?: string | null;
          id?: string | null;
          metadata?: Json | null;
          name?: string | null;
          type?: Database['public']['Enums']['QuestionType'] | null;
          year?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Question_correctAnswerId_fkey';
            columns: ['correctAnswerId'];
            referencedRelation: 'Answer';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Functions: {
      get_current_server_time: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      get_enums: {
        Args: Record<PropertyKey, never>;
        Returns: {
          enumlabel: string;
          typname: string;
          table_schema: string;
          table_name: string;
          column_name: string;
        }[];
      };
      get_game_data: {
        Args: {
          gameId: string;
        };
        Returns: {
          id: string;
          tournamentId: string;
          year: number;
          stage: number;
          status: Database['public']['Enums']['GameStatus'];
          stageStartTime: string;
          stageEndTime: string;
          currentTime: string;
        }[];
      };
      get_schema_data: {
        Args: Record<PropertyKey, never>;
        Returns: {
          constraint_name: string;
          constraint_type: string;
          self_schema: string;
          self_table: string;
          self_columns: string;
          foreign_schema: string;
          foreign_table: string;
          foreign_columns: string;
          definition: string;
        }[];
      };
      insert_tournament: {
        Args: {
          created_by_id: string;
          generatedLobbyCode: string;
          includePracticeRound: boolean;
          instructor_name?: string;
        };
        Returns: undefined;
      };
      update_auction_timer_on_bid_insert: {
        Args: {
          bid_id: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      GameStatus: 'notStarted' | 'active' | 'finalYear' | 'waitingForNextYear' | 'ended';
      GlobalEventType: 'positiveRisk' | 'negativeRisk' | 'neutral' | 'increaseRates' | 'maxDebtEquity';
      LocalEventType: 'positive' | 'negative';
      NotificationType:
        | 'endOfYearType'
        | 'equityInvestmentType'
        | 'quizFundingType'
        | 'financingType'
        | 'auctionType'
        | 'localEventType'
        | 'globalEventType'
        | 'accountingType'
        | 'endOfYearEarnings'
        | 'maxDebtFine';
      PeriodType:
        | 'welcome'
        | 'gamePreview'
        | 'yearStart'
        | 'equityInvestment'
        | 'questionsPre'
        | 'questions'
        | 'questionsPost'
        | 'analysisPre'
        | 'analysis'
        | 'analysisPost'
        | 'financePre'
        | 'finance'
        | 'financePost'
        | 'auctionPre'
        | 'auction'
        | 'auctionSold'
        | 'auctionPost'
        | 'auctionPostSummary'
        | 'localEventPre'
        | 'localEvent'
        | 'localEventPost'
        | 'globalEventPre'
        | 'globalEvent'
        | 'companyEarnings'
        | 'accountingPre'
        | 'accounting'
        | 'accountingResults'
        | 'accountingSummary'
        | 'yearEnd'
        | 'gameEnd';
      QuestionType: 'simple' | 'tabular';
      TeamStatus:
        | 'awaitingTeamName'
        | 'awaitingTeamMembers'
        | 'awaitingRegistrationCode'
        | 'active'
        | 'awaitingNextPeriod';
      TournamentStatus: 'active' | 'inactive' | 'paused';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
