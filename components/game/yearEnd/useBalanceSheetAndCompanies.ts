import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { BalanceSheet, Game, Member, Team } from '@/types/database';
import { useEffect, useState } from 'react';

export type TeamWithNumberOfCompanies = {
  teamId: string;
  companies: number;
};

export type TeamWithBalanceSheetDataAndMembers = BalanceSheet & {
  Team: Team & { Member: Member[]; TeamCompany: [{ companyId: string }] };
};

export const useBalanceSheetAndCompanies = (game: Game, fetchPrevBalanceSheet: boolean) => {
  const [teamBalanceSheets, setTeamBalanceSheets] = useState<TeamWithBalanceSheetDataAndMembers[]>([]);
  const [prevTeamBalanceSheets, setPrevTeamBalanceSheets] = useState<BalanceSheet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirstYear, setIsFirstYear] = useState<boolean>(false);
  const [finalYear, setFinalYear] = useState<number>();

  const { supabase } = useSupabase<'public'>();

  useEffect(() => {
    const fetchTeamCompaniesBalanceSheetData = async () => {
      const { data: Tournament } = await supabase
        .from('Tournament')
        .select('practiceRound, finalYear')
        .eq('id', game.tournamentId)
        .single();
      if (Tournament?.practiceRound === true && game.year === 0) {
        setIsFirstYear(true);
      } else if (Tournament?.practiceRound === false && game.year === 1) {
        setIsFirstYear(true);
      }

      if (Tournament?.finalYear) {
        setFinalYear(Tournament?.finalYear);
      }

      const { data: teamIds } = await supabase.from('Team').select('id').eq('gameId', game.id);

      if (teamIds) {
        const { data: BalanceSheets, error: BalanceSheetsError } = await supabase
          .from('BalanceSheet')
          .select('*, Team(*, Member(*),TeamCompany(companyId))')
          .in(
            'teamId',
            teamIds.map((team) => team.id)
          )
          .eq('year', game.year)
          .is('Team.TeamCompany.yearSold', null)
          .order('equity', { ascending: false });
        if (BalanceSheets) {
          setTeamBalanceSheets(BalanceSheets as TeamWithBalanceSheetDataAndMembers[]);
        } else if (BalanceSheetsError) {
          console.log(BalanceSheetsError.message);
        }
        if (fetchPrevBalanceSheet) {
          const { data: PrevBalanceSheet } = await supabase
            .from('BalanceSheet')
            .select('*')
            .in(
              'teamId',
              teamIds.map((team) => team.id)
            )
            .eq('year', game.year - 1 ?? 0);

          if (PrevBalanceSheet) {
            setPrevTeamBalanceSheets(PrevBalanceSheet as BalanceSheet[]);
          }
        } else {
          setPrevTeamBalanceSheets([]);
        }
      }
      setIsLoading(false);
    };
    fetchTeamCompaniesBalanceSheetData();
  }, []);

  return { isLoading, teamBalanceSheets, prevTeamBalanceSheets, isFirstYear, finalYear };
};
