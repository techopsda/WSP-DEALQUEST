import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { Game, Tournament } from '@/types/database';
import { getBypassUserId, isAuthBypassEnabled } from '@/lib/auth/authBypass';
import { redirect } from 'next/navigation';

type TournamentWithGames = Tournament & { Game: Game[] };

const AuthenticatedPage = async () => {
  const supabase = await createSupabaseServerClient<'public'>('public');

  let userId = getBypassUserId();

  if (!isAuthBypassEnabled()) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/login');
    }

    userId = user.id;
  }

  const { data: tournament } = await supabase
    .from('Tournament')
    .select('*, Game(*)')
    .eq('createdById', userId)
    .eq('status', 'active')
    .maybeSingle();

  const getTournamentUrl = (tournament: TournamentWithGames | null) => {
    if (tournament && tournament.status !== 'inactive' && tournament.Game.every((game) => game.status !== 'ended')) {
      return `${tournament.lobbyCode}`;
    } else {
      return 'create-game';
    }
  };

  const getDashboardUrl = (tournament: TournamentWithGames | null) => {
    if (
      tournament &&
      tournament.Game.length > 0 &&
      tournament.Game.every((game) => game.status !== 'ended' && game?.status !== 'notStarted')
    ) {
      return '/dashboard';
    } else {
      return '';
    }
  };

  const tournamentUrl = getTournamentUrl(tournament);

  const dashboardUrl = getDashboardUrl(tournament);

  redirect(`/tournament/${tournamentUrl}${dashboardUrl}`);
};

export default AuthenticatedPage;
