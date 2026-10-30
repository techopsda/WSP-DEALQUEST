import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { getRandomQuestion } from './getRandomQuestion';
import { TeamQuestion } from '@/types/database';

export const insertQuestionForGame = async (gameId: string, gameYear: number) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const { data: allTeamsForGame } = await supabase.from('Team').select('id').eq('gameId', gameId);

  if (allTeamsForGame && allTeamsForGame.length > 0) {
    const randomQuestions = await getRandomQuestion(gameYear);
    if (randomQuestions) {
      const teamsQuestionsArray: Pick<TeamQuestion, 'teamId' | 'questionId' | 'orderNumber'>[] = [];
      allTeamsForGame.forEach((team) => {
        randomQuestions.forEach((randomQuestion, index) => {
          if (randomQuestion.id) {
            teamsQuestionsArray.push({
              teamId: team.id,
              questionId: randomQuestion.id,
              orderNumber: index + 1
            });
          }
        });
      });

      const { error: insertTeamQuestionError } = await supabase.from('TeamQuestion').insert(teamsQuestionsArray);
      if (insertTeamQuestionError) {
        throw new Error(
          `GAME/functions/insertQuestionForGame => year:${gameYear}, ERROR INSERTING TEAM QUESTION:  ${insertTeamQuestionError.message}`
        );
      }
    } else {
      throw new Error(
        `GAME/functions/insertQuestionForGame => year:${gameYear}, ERROR GETTING RANDOM UNIQUE QUESTION `
      );
    }
  }
};
