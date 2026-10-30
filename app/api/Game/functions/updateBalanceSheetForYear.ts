import { balanceSheetFallback } from '@/lib/shared/balanceSheetFallback';
import { getAsyncSettings } from '@/submodules/supabase-functions/lib/settings/getAsyncSettings';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { BalanceSheet, Game, NotificationToInsert } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import _ from 'lodash';

export const updateBalanceSheetForYear = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const { interestRate, practiceRoundQuestionEarnings } = await getAsyncSettings<
    GameSettings,
    'interestRate' | 'practiceRoundQuestionEarnings'
  >(['interestRate', 'practiceRoundQuestionEarnings']);

  const { data: allTeamsForGame, error: ErrorFetchtingTeamData } = await supabase
    .from('Team')
    .select('*, Finance(*), TeamCompany(*, Company(*, Earnings(*))), BalanceSheet(*)')
    .eq('gameId', game.id)
    .eq('BalanceSheet.year', game.year)
    .is('TeamCompany.yearSold', null)
    .eq('TeamCompany.Company.Earnings.year', game?.year)
    .eq('Finance.year', game?.year);

  if (ErrorFetchtingTeamData) {
    throw new Error(
      `Game/functions/updateBalanceSheetForYear, Error fetching team data : ${ErrorFetchtingTeamData.message}`
    );
  }

  const { data: globalEvent } = await supabase
    .from('GlobalEvent')
    .select('*')
    .eq('orderNo', game.year)
    .limit(1)
    .single();

  const calculatedInterestRate =
    globalEvent?.type === 'increaseRates' ? (interestRate?.rate ?? 0) * 3 : interestRate?.rate ?? 0;

  const newNotificationsAndBalanceSheets = await Promise.all(
    allTeamsForGame?.map(async (team) => {
      if (team?.BalanceSheet?.length > 1) throw new Error('QUERIED MULTIPLE BALANCE SHEETS');
      if (team?.Finance?.length > 1) throw new Error('QUERIED MULTIPLE FINANCE SHEETS');

      const teamBalanceSheet = team?.BalanceSheet[0] ?? (await balanceSheetFallback(team?.id, game));

      const currentFinanceSheet = team?.Finance[0];
      const teamCompanyArray = team?.TeamCompany;
      const filteredTeamCompanyArray = teamCompanyArray.filter((teamCompanies) => teamCompanies?.yearSold === null);
      const allEarnings = _.flatMap(filteredTeamCompanyArray, (teamCompany) => {
        const companyArray = teamCompany?.Company;
        return companyArray?.Earnings;
      });

      const totalEarnings = _.sumBy(allEarnings ?? [], 'amount');

      const debtBeforeInterest =
        (teamBalanceSheet?.debt ?? 0) +
        (currentFinanceSheet?.amountBorrowed ?? 0) -
        (currentFinanceSheet?.amountDebtPaid ?? 0);

      const debtInterest = Math.round(debtBeforeInterest * (calculatedInterestRate / 100));
      const quizFunding =
        game.year !== 0 ? teamBalanceSheet?.quizFund ?? 0 : practiceRoundQuestionEarnings?.amount ?? 0;

      const financeFunding =
        (currentFinanceSheet?.amountBorrowed ?? 0) +
        (currentFinanceSheet?.amountIncomeSale ?? 0) -
        (currentFinanceSheet?.amountDebtPaid ?? 0);

      const netIncome =
        totalEarnings +
        (teamBalanceSheet?.localEventFund ?? 0) +
        (teamBalanceSheet?.globalEventFund ?? 0) -
        debtInterest;

      const subtotalEquity =
        (teamBalanceSheet?.equity ?? 0) +
        (teamBalanceSheet?.roundFund ?? 0) +
        quizFunding +
        netIncome -
        (teamBalanceSheet?.maxDebtFine ?? 0);

      const subtotalCash =
        (teamBalanceSheet?.cash ?? 0) +
        (teamBalanceSheet?.roundFund ?? 0) +
        quizFunding +
        financeFunding +
        netIncome -
        (teamBalanceSheet?.auctionSpendings ?? 0);

      return {
        notification: {
          teamId: team.id,
          year: game.year,
          stage: game.stage,
          type: 'endOfYearEarnings',
          message: { messageValue: `${totalEarnings}` }
        } as NotificationToInsert,
        newBalanceSheet: {
          ...teamBalanceSheet,
          cash: subtotalCash,
          debt: debtBeforeInterest,
          equity: subtotalEquity
        } as BalanceSheet
      };
    })
  );

  const newNotifications = _.map(newNotificationsAndBalanceSheets, 'notification');
  const newBalanceSheets = _.map(newNotificationsAndBalanceSheets, 'newBalanceSheet');

  const { error: balanceSheetError } = await supabase.from('BalanceSheet').upsert(newBalanceSheets);
  if (balanceSheetError)
    throw new Error(
      `GAME/functions/updateBalanceSheetForYear => year:${game.year}, ERROR UPSERTING BALANCESHEETS: ${balanceSheetError?.message}`
    );

  const { error: notificationError } = await supabase.from('Notification').insert(newNotifications);
  if (notificationError)
    throw new Error(
      `GAME/functions/updateBalanceSheetForYear => year:${game.year}, ERROR INSERTING NOTIFICATIONS: ${notificationError?.message}`
    );
};
