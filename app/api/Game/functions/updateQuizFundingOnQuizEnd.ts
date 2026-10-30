import { calculateQuizFunding } from '@/components/game/questions/calculateQuizFunding';
import { balanceSheetFallback } from '@/lib/shared/balanceSheetFallback';
import { getAsyncSettings } from '@/submodules/supabase-functions/lib/settings/getAsyncSettings';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { BalanceSheet, Game, TeamQuestionsWithAnswers } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import _ from 'lodash';

export const updateQuizFunding = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  const { questionAmounts, practiceRoundQuestionEarnings } = await getAsyncSettings<
    GameSettings,
    'questionAmounts' | 'practiceRoundQuestionEarnings'
  >(['questionAmounts', 'practiceRoundQuestionEarnings']);

  // fetch all teams in the game
  const { data: allTeamsForGame, error: errorFetchingTeams } = await supabase
    .from('Team')
    .select('id, BalanceSheet(*), TeamQuestion!inner(*, Question(*))')
    .eq('gameId', game.id)
    .eq('TeamQuestion.Question.year', game.year)
    .eq('BalanceSheet.year', game.year);

  if (allTeamsForGame) {
    const updatedBalancesheet = await Promise.all(
      allTeamsForGame.map(async (team) => {
        const orderedTeamQuestions = _.orderBy(team?.TeamQuestion, (teamQuestion) => teamQuestion.orderNumber, 'asc');

        const filteredTeamQuestions = orderedTeamQuestions.filter(
          (teamQuestion) => teamQuestion.selectedAnswerId !== null && teamQuestion.Question?.year === game.year
        );

        const quizFunding = calculateQuizFunding(
          filteredTeamQuestions as TeamQuestionsWithAnswers[],
          questionAmounts?.toAward ?? 5,
          questionAmounts?.toDeduct ?? 2
        );
        const teamBalanceSheet = team.BalanceSheet[0] ?? (await balanceSheetFallback(team?.id, game));

        const finalQuizFunding = game.year !== 0 ? quizFunding : practiceRoundQuestionEarnings?.amount ?? 30;

        return {
          ...teamBalanceSheet,
          quizFund: finalQuizFunding
        } as BalanceSheet;
      })
    );

    if (updatedBalancesheet) {
      const { error: errorUpdateBalanceSheetQuizFund } = await supabase
        .from('BalanceSheet')
        .upsert(updatedBalancesheet);
      if (errorUpdateBalanceSheetQuizFund) {
        throw new Error(
          `GAME/handlePeriodMove/updateQuizFundingOnQuizEnd => year:${game.year}, Could not update quizFunding : ${errorUpdateBalanceSheetQuizFund.message}`
        );
      }
    }
  }

  if (errorFetchingTeams) {
    throw new Error(
      `GAME/handlePeriodMove/updateQuizFundingOnQuizEnd => year:${game.year}, Could not fetch teams for game : ${errorFetchingTeams.message}`
    );
  }
};
