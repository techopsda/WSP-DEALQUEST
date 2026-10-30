import { balanceSheetFallback } from '@/lib/shared/balanceSheetFallback';
import { getAsyncSetting } from '@/submodules/supabase-functions/lib/settings/getAsyncSetting';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { BalanceSheet, Game, TeamLocalEvent } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import _ from 'lodash';

export const getLocalEvents = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const localEventAmount = await getAsyncSetting<GameSettings, 'localEventAmounts'>('localEventAmounts');

  //fetch teams ids
  const { data: teamsWithBalanceSheetAndLocalEvent } = await supabase
    .from('Team')
    .select('id, BalanceSheet(*), TeamLocalEvent(localEventId)')
    .eq('gameId', game?.id)
    .eq('BalanceSheet.year', game?.year);

  if (teamsWithBalanceSheetAndLocalEvent) {
    //order desc balanceSheets using equity
    const balanceSheets = _.orderBy(
      _.flatMap(teamsWithBalanceSheetAndLocalEvent, (team) => team.BalanceSheet),
      (balanceSheet) => balanceSheet?.equity,
      'desc'
    );

    if (balanceSheets) {
      const teamLocalEventsWithBalancesheets = await Promise.all(
        teamsWithBalanceSheetAndLocalEvent.map(async (team) => {
          const teamBalanceSheet = team.BalanceSheet[0] ?? (await balanceSheetFallback(team.id, game));

          const previousEventIds = _.map(team?.TeamLocalEvent, (localEvent) => localEvent?.localEventId ?? '');

          //find team's index to determine if team is  placed in top half or bottom half of the leaderBoard
          const teamIndex = balanceSheets.findIndex((balanceSheet) => balanceSheet?.teamId === team?.id);
          const isTeamLosing = teamIndex >= (balanceSheets.length - 1) / 2;

          //determine the amount to reward or deduct
          const amount =
            isTeamLosing || game?.year === 0 ? localEventAmount?.amount ?? 5 : -(localEventAmount?.amount ?? 5);

          //get random filtered localevents to fetch unique and random events for team
          const { data: localEvent } = await supabase
            .from('localevent_random_view')
            .select('*')
            .eq('type', isTeamLosing || game?.year === 0 ? 'positive' : 'negative')
            .not('id', 'in', `(${(previousEventIds ?? [])?.join(',')})`)
            .limit(1)
            .maybeSingle();

          return {
            teamLocalEvent: {
              teamId: team?.id,
              localEventId: localEvent?.id ?? '',
              year: game?.year
            } as TeamLocalEvent,
            updatedbalanceSheet: {
              ...teamBalanceSheet,
              localEventFund: amount
            } as BalanceSheet
          };
        })
      );

      const teamLocalEventsArray = teamLocalEventsWithBalancesheets.map((teamsData) => teamsData.teamLocalEvent);
      const updatedBalanceSheetsArray = teamLocalEventsWithBalancesheets.map(
        (teamsData) => teamsData.updatedbalanceSheet
      );

      //insert TeamLocalEvents array
      const { error: teamLocalEventDataError } = await supabase.from('TeamLocalEvent').insert(teamLocalEventsArray);
      if (teamLocalEventDataError) {
        throw new Error(
          'GAME/handlePeriodMove/getLocalEvents => ERROR OCCURED INSERTING TEAM LOCAL EVENT DATA: ' +
            teamLocalEventDataError?.message
        );
      }

      //update BalanceSheets using BalanceSheetsArray with rewarded ammount
      const { error: updateBalanceSheetError } = await supabase.from('BalanceSheet').upsert(updatedBalanceSheetsArray);

      if (updateBalanceSheetError) {
        throw new Error(
          'GAME/handlePeriodMove/getLocalEvents => ERROR OCCURRED UPDATING BALANCE SHEETS FOR LOCAL EVENT: ' +
            updateBalanceSheetError?.message
        );
      }
    }
  }
};
