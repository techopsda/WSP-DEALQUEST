import { getCompaniesNumberForCurrentYear } from '@/lib/shared/getCompaniesNumberForCurrentYear';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Game } from '@/types/database';

export const insertCompaniesForAuction = async (game: Game) => {
  const supabase = await createSupabaseServerClient<'public'>('public');
  const { data: allTeamsForGame, error: gettingAllTeamsForGameError } = await supabase
    .from('Team')
    .select('id')
    .eq('gameId', game.id);

  const targetNumberCompanies = getCompaniesNumberForCurrentYear(game.year, allTeamsForGame?.length ?? 0) as number;

  if (!gettingAllTeamsForGameError && allTeamsForGame.length > 0 && targetNumberCompanies) {
    const { data: randomCompany } = await supabase
      .from('company_random_view')
      .select()
      .eq('year', game.year)
      .limit(targetNumberCompanies);

    if (randomCompany && randomCompany.length > 0) {
      if (game.year === 0) {
        await supabase.from('Auction').insert(
          randomCompany.map((randomCompany) => {
            return {
              companyId: randomCompany?.id ?? '',
              gameId: game.id,
              year: game.year,
              lot: 1,
              active: true
            };
          })
        );
      } else {
        const { error: insertAuctionError } = await supabase.from('Auction').insert(
          randomCompany.map((company, index) => {
            return { companyId: company?.id ?? '', gameId: game.id, year: game.year, lot: index + 1, active: true };
          })
        );
        if (insertAuctionError)
          throw new Error(
            `GAME/handlePeriodMove/insertCompaniesForAuction => year: ${game.year}, ERROR INSERTING AUCTION COMPANIES: 
              ${insertAuctionError.message}`
          );
      }
    } else {
      throw new Error(
        `GAME/handlePeriodMove/insertCompaniesForAuction => year: ${game.year} ERROR GETTING RANDOM COMPANIES, length of randomCompany array was 0 or less.`
      );
    }
  } else {
    throw new Error(
      `GAME/handlePeriodMove/insertCompaniesForAuction => year: ${game.year} ERROR GETTING ALL TEAMS FOR GAME: ${gettingAllTeamsForGameError?.message}`
    );
  }
};
