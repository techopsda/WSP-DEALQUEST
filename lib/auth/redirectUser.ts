import { MaybeSession } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Team, Tournament } from '@/types/database';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface RedirectUserProps {
  session: MaybeSession;
  router: AppRouterInstance;
  teamId: string;
  supabase: SupabaseClient<Database, 'public'>;
}

export const redirectUser = async ({ session, router, teamId, supabase }: RedirectUserProps) => {
  const { data: tournament }: { data: Tournament[] | null } = await supabase
    .from('Tournament')
    .select('*')
    .or('status.eq.active,status.eq.paused');

  // If an instructor is logged in
  if (session?.user?.id) {
    const instructorTournament = tournament?.find(
      (tournament: Tournament) => tournament.createdById === session?.user?.id
    );
    if (instructorTournament) {
      router.push(`/tournament/${instructorTournament.lobbyCode}`);
    } else {
      router.push('/tournament/create-game');
    }
  } else if (teamId) {
    const { data: team }: { data: Team | null } = await supabase.from('Team').select().eq('id', teamId).maybeSingle();

    if (team) {
      const teamTournament = tournament?.find((tournament) => tournament.id === team?.tournamentId);

      if (teamTournament) {
        router.push(`/tournament/${teamTournament.lobbyCode}`);
      }
    }
  }
};
