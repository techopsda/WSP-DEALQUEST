import { Game, GameStatusEnum, Team, Tournament } from '@/types/database';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import _ from 'lodash';

export const createGamesFromTeamSplit = async (
  splitTeams: Array<Array<string>>,
  teams: Team[],
  tournament: Tournament,
  supabase: SupabaseClient<Database, 'public'>
) => {
  const newGames = splitTeams.map(() => {
    return {
      tournamentId: tournament.id,
      year: tournament?.practiceRound ? 0 : 1,
      stage: 0,
      status: 'notStarted' as GameStatusEnum
    };
  });

  const teamsToRemove = teams
    .filter((team) => team.status !== 'active')
    .forEach(async (team) => {
      await supabase.from('Member').delete().eq('teamId', team.id);
      await supabase.from('Team').delete().eq('id', team.id);
    });

  const { data: returnedGames } = await supabase.from('Game').insert(newGames).select();

  if (returnedGames) {
    for (let i = 0; i < splitTeams.length; i++) {
      const game = returnedGames[i];

      if (game) {
        const gameTeams = splitTeams[i]
          .filter((teamId) => {
            const team = teams.find((teamArrayItem) => teamArrayItem.id === teamId);

            return team?.status === 'active';
          })
          .map((teamId) => {
            const team = teams.find((teamArrayItem) => teamArrayItem.id === teamId);
            return { ...team, gameId: game.id };
          }) as unknown[];

        await supabase.from('Team').upsert(gameTeams as Team[]);
      }
    }
  }
};
