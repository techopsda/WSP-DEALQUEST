import { ErrorBox } from '@/components/shared/ErrorBox';
import { GameScreen } from '@/components/game/GameScreen';
import { TournamentSignOutButton } from '@/components/game/TournamentSignOutButton';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';

interface Props {
  params: Promise<{ lobbyCode: string }>;
}

export const revalidate = 0;

const Game = async ({ params }: Props) => {
  // Extract lobby code from URL
  const { lobbyCode } = await params;
  if (!lobbyCode) {
    return <ErrorBox title="Lobby code not found" message="Use the button below in order to enter a new lobby" />;
  }
  const supabase = await createSupabaseServerClient<'public'>('public');

  // Use lobby code to fetch the tournament from the database
  const { data: tournament, error: tournamentError } = await supabase
    .from('Tournament')
    .select('*, Team(*), Game(*)')
    .eq('lobbyCode', lobbyCode)
    .maybeSingle();

  if (tournamentError)
    return <ErrorBox title={tournamentError.message} message="Use the button below in order to enter a new lobby" />;
  if (!tournament || tournament?.status === 'inactive')
    return (
      <ErrorBox title={'No lobby found with that code'} message="Use the button below in order to enter a new lobby" />
    );
  return (
    <>
      <TournamentSignOutButton />
      <GameScreen
        serverTeams={tournament?.Team ?? []}
        serverGames={tournament?.Game ?? []}
        tournament={tournament}
      />
    </>
  );
};

export default Game;
