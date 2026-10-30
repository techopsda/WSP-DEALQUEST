import { BalanceSheet, Finance, Game, GlobalEvent, Notification, Team } from '@/types/database';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { getBalanceSheetYear } from '../shared/getBalanceSheetYear';

export const useAccountingInputData = (
  team: Team,
  game: Game,
  supabase: SupabaseClient<Database, 'public'>,
  hasPracticeRound: boolean
) => {
  const [initialNotifications, setInitialNotifications] = useState<Notification[] | undefined>();
  const [currentBalanceSheet, setCurrentBalanceSheet] = useState<BalanceSheet>();
  const [prevBalanceSheet, setPrevBalanceSheet] = useState<BalanceSheet | {}>({});
  const [globalEvent, setGlobalEvent] = useState<GlobalEvent | null>(null);
  const [financeSheet, setFinanceSheet] = useState<Finance>();

  const { fetchPrevBalanceSheet } = getBalanceSheetYear(game?.year, hasPracticeRound);

  useEffect(() => {
    const getBalanceSheetData = async () => {
      const { data: balanceSheetData } = await supabase
        .from('BalanceSheet')
        .select('*')
        .eq('year', game.year)
        .eq('teamId', team.id)
        .maybeSingle();
      if (balanceSheetData) {
        setCurrentBalanceSheet(balanceSheetData);
      }

      if (fetchPrevBalanceSheet) {
        const { data: prevBalanceSheetData } = await supabase
          .from('BalanceSheet')
          .select('*')
          .eq('year', game.year - 1)
          .eq('teamId', team.id)
          .maybeSingle();

        setPrevBalanceSheet((prevBalanceSheetData as BalanceSheet) ?? {});
      } else {
        setPrevBalanceSheet({});
      }
    };
    const getFinanceSheet = async () => {
      const { data: financeSheetData } = await supabase
        .from('Finance')
        .select()
        .eq('year', game.year)
        .eq('teamId', team.id)
        .maybeSingle();

      if (financeSheetData) {
        setFinanceSheet(financeSheetData);
      }
    };

    const getnotifications = async () => {
      const { data: notifications } = await supabase
        .from('Notification')
        .select('*')
        .or(`teamId.eq.${team.id}, gameId.eq.${game.id}`);

      if (notifications) {
        setInitialNotifications((notifications as Notification[]) ?? []);
      }
    };

    if (!initialNotifications || game.periodType === 'accounting') getnotifications();
    if (!currentBalanceSheet || !prevBalanceSheet) getBalanceSheetData();
    if (!financeSheet) getFinanceSheet();
  }, [game.periodType, team.status]);

  useEffect(() => {
    const getGlobalEvent = async () => {
      const { data: globalEventData } = await supabase
        .from('GlobalEvent')
        .select('*')
        .eq('orderNo', game.year)
        .limit(1)
        .single();

      setGlobalEvent(globalEventData);
    };
    getGlobalEvent();
  }, []);

  return { initialNotifications, currentBalanceSheet, prevBalanceSheet, financeSheet, globalEvent };
};
