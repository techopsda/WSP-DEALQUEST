import { Game } from '@/types/database';
import { insertCompaniesForAuction } from './insertCompaniesForAuction';
import { handlePracticeRoundCompanies } from './handlePracticeRoundCompanies';
import { insertBalanceSheetForTeam } from './insertBalanceSheetForTeam';
import { insertNotificationOnQuizFinish } from './insertNotificationOnQuizFinish';
import { insertQuestionForGame } from './insertQuestionForGame';
import { notifyTeamOnFinanceActivities } from './notifyTeamOnFinanceActivities';
import { updateQuizFunding } from './updateQuizFundingOnQuizEnd';
import { moveGameToNextAuction } from './moveGameToNextAuction';
import { getLocalEvents } from './getLocalEvent';
import { insertLocalEventNotification } from './insertLocalEventNotification';
import { getGlobalEvents } from './getGlobalEvents';
import { updateBalanceSheetForYear } from './updateBalanceSheetForYear';
import { addAccountingEarningsToBalanceSheetAndNotifyTeam } from './notifyTeamOnAccountingFinish';
import { insertEndOfYearNotification } from './insertEndOfYearNotification';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';

export const handlePeriodMove = async (oldGame: Game, newGame: Game) => {
  console.log(`Game/handlePeriodMove - oldGame: ${JSON.stringify(oldGame)}`);
  console.log(`Game/handlePeriodMove - newGame: ${JSON.stringify(newGame)}`);

  const supabase = await createSupabaseServerClient<'public'>('public');

  if (oldGame?.periodType !== 'equityInvestment' && newGame?.periodType === 'equityInvestment') {
    console.log('Game/handlePeriodMove, insertBalanceSheetForTeam()');
    await insertBalanceSheetForTeam(newGame);
    console.log('Game/handlePeriodMove, insertQuestionForGame()');
    await insertQuestionForGame(newGame.id, newGame.year);
  }

  if (oldGame.periodType === 'questions' && newGame.periodType === 'questionsPost') {
    console.log('Game/handlePeriodMove, updateQuizFunding()');
    await updateQuizFunding(newGame);
    console.log('Game/handlePeriodMove, insertNotificationOnQuizFinish()');
    await insertNotificationOnQuizFinish(newGame);
  }

  if (oldGame?.periodType === 'questionsPost' && newGame?.periodType === 'analysisPre') {
    console.log('Game/UPDATE, insertCompaniesForAuction()');
    await insertCompaniesForAuction(newGame);
  }

  if (oldGame?.periodType === 'finance' && newGame?.periodType === 'financePost') {
    if (newGame?.year === 0) {
      console.log('Game/handlePeriodMove, handlePracticeRoundCompanies()');
      await handlePracticeRoundCompanies(newGame);
    }

    console.log('Game/handlePeriodMove, notifyTeamOnFinanceActivities()');
    await notifyTeamOnFinanceActivities(newGame);
  }

  if (oldGame.periodType === 'auction' && newGame.periodType === 'auctionSold') {
    console.log('Game/handlePeriodMove, moveGameToNextAuction()');
    await moveGameToNextAuction(newGame);
  }

  if (oldGame?.periodType === 'auctionPostSummary' && newGame?.periodType === 'localEventPre') {
    console.log('Game/handlePeriodMove, getLocalEvents()');
    await getLocalEvents(newGame);
  }

  if (oldGame?.periodType !== 'localEvent' && newGame?.periodType === 'localEvent') {
    console.log('Game/handlePeriodMove, insertLocalEventNotification()');
    await insertLocalEventNotification(newGame);
  }

  if (oldGame.periodType !== 'globalEvent' && newGame.periodType === 'globalEvent') {
    console.log('Game/handlePeriodMove, getGlobalEvents()');
    await getGlobalEvents(newGame);
  }

  if (oldGame.periodType !== 'companyEarnings' && newGame.periodType === 'companyEarnings') {
    console.log('Game/handlePeriodMove, updateBalanceSheetForYear()');
    await updateBalanceSheetForYear(newGame);
  }

  if (oldGame?.periodType === 'accounting' && newGame?.periodType === 'accountingResults') {
    console.log('Game/handlePeriodMove, addAccountingEarningsToBalanceSheetAndNotifyTeam()');
    await addAccountingEarningsToBalanceSheetAndNotifyTeam(newGame);
  }

  if (oldGame?.periodType !== 'yearEnd' && newGame?.periodType === 'yearEnd') {
    console.log('Game/handlePeriodMove, insertEndOfYearNotification()');
    await insertEndOfYearNotification(newGame);
  }

  const { error: teamUpdateError } = await supabase.from('Team').update({ status: 'active' }).eq('gameId', newGame?.id);
  if (teamUpdateError) throw new Error('moveGameToNextPeriod - TEAM UPDATE ERROR ON PERIOD UPDATE TEAM ');
};
