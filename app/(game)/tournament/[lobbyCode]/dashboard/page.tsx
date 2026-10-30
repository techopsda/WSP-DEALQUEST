'server-only';

import InstructorDashboard from '@/components/instructorDashboard/InstructorDashboard';
import { ErrorBox } from '@/components/shared/ErrorBox';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { redirect } from 'next/navigation';

const InstructorDashboardPage = async ({ params }: { params: Promise<{ lobbyCode: string }> }) => {
  const { lobbyCode } = await params;

  if (!lobbyCode)
    return <ErrorBox title="Lobby code not found" message="Use the button below in order to enter a new lobby" />;

  const supabase = await createSupabaseServerClient<'public'>('public');

  const { data: tournament, error: tournamentError } = await supabase
    .from('Tournament')
    .select()
    .eq('lobbyCode', lobbyCode)
    .maybeSingle();

  if (tournamentError)
    return <ErrorBox title={tournamentError.message} message="Use the button below in order to enter a new lobby" />;
  if (!tournament)
    return (
      <ErrorBox title={'No lobby found with that code'} message="Use the button below in order to enter a new lobby" />
    );

  const { data: games, error: gamesError } = await supabase
    .from('Game')
    .select()
    .eq('tournamentId', tournament.id)
    .neq('status', 'ended');

  if (gamesError || !games) {
    return (
      <ErrorBox
        title={`Error occured getting games: ${gamesError.message}`}
        message="Use the button below in order to enter a new lobby"
      />
    );
  }

  if (tournament.status === 'inactive') {
    redirect('/tournament/create-game');
  }

  return <InstructorDashboard serverGames={games} tournament={tournament} />;
};

export default InstructorDashboardPage;
