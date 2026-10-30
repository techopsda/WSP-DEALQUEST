import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Game } from '@/types/database';
import _ from 'lodash';

export const handlePracticeRoundCompanies = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const { data: allTeamsForGame } = await supabase.from('Team').select().eq('gameId', game.id);

  if (allTeamsForGame) {
    const { data: allAuctions } = await supabase
      .from('Auction')
      .select('id, Company(*)')
      .eq('gameId', game.id)
      .eq('year', game.year);

    const allCompanies = _.flatMap(allAuctions, (auction) => auction?.Company);
    const { error: teamCompanyInsertError } = await supabase.from('TeamCompany').insert(
      allTeamsForGame.map((team, index) => {
        return {
          teamId: team.id,
          companyId: allCompanies[index]?.id ?? '',
          yearBought: 0
        };
      })
    );

    if (teamCompanyInsertError)
      throw new Error(
        'GAME/handlePeriodMove/handlePracticeRoundCompanies => PRACTICE YEAR ONLY, ERROR OCCURRED INSERTING TEAM COMPANIES: ' +
          teamCompanyInsertError?.message
      );
  }
};
