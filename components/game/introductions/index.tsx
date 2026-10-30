import { TooltipComponent } from '@/components/shared/TooltipComponent';
import { Game, Team, Member, Tournament } from '@/types/database';
import { Joyride as ReactJoyride } from 'react-joyride';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useEffect, useState } from 'react';
import { GamePreview } from './GamePreview';
import { Welcome } from './welcome';
import { YearStart } from './yearStart';
import { getTooltips } from '@/lib/shared/getTooltips';

interface IntroductionsProps {
  team: Team;
  game: Game;
  tournament: Tournament;
}

export const Introductions: React.FC<IntroductionsProps> = ({ team, game, tournament }) => {
  const { supabase } = useSupabase<'public'>();
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const { data: teamMembersData, error: errorFetchingTeamMembers } = await supabase
        .from('Member')
        .select('*')
        .eq('teamId', team.id);

      setTeamMembers((teamMembersData as Member[]) ?? []);
      if (errorFetchingTeamMembers) {
        console.log(`Error fetching team members: ${errorFetchingTeamMembers.message}`);
      }
    };
    fetchTeamMembers();
  }, [game]);

  const steps = getTooltips(game.periodType, game.year);
  return (
    <>
      {game.periodType === 'welcome' && (
        <>
          <ReactJoyride steps={steps ?? []} tooltipComponent={TooltipComponent} />
          <Welcome
            team={team}
            tournament={tournament}
            game={game}
            teamMembers={teamMembers}
            instructorName={tournament.instructorName ?? 'Instructor'}
          />
        </>
      )}
      {game.periodType === 'yearStart' && (
        <YearStart
          team={team}
          tournament={tournament}
          game={game}
          yearTitle={game.year === 0 ? 'Practice Year' : `Year ${game.year}`}
          year={game.year}
          practiceRound={tournament?.practiceRound}
        />
      )}
      {game.periodType === 'gamePreview' && <GamePreview tournament={tournament} game={game} team={team} />}
    </>
  );
};
