'use client';

import { generateRandomLobbyCode } from '@/lib/tournament/generateRandomLobbyCode';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogoGroup from '@/components/lobby/LogoGroup';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Ring } from '@uiball/loaders';

const InstructorCreateGame = () => {
  const { supabase, session } = useSupabase<'public'>();
  const [includePracticeRound, setIncludePracticeRoud] = useState<boolean>(true);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const generateCode: (lobbyCodes: string[]) => string = (lobbyCodes: string[]) => {
    const code = generateRandomLobbyCode(5);
    if (lobbyCodes.find((lobbyCode) => lobbyCode === code)) {
      return generateCode(lobbyCodes);
    } else {
      return code;
    }
  };

  const CreateLobby = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(userError?.message ?? 'Your session has expired. Please sign in again.');
      }

      const { data: tournaments, error: tournamentsError } = await supabase.from('Tournament').select('lobbyCode');

      if (tournamentsError) {
        throw new Error(`Unable to read existing lobby codes: ${tournamentsError.message}`);
      }

      const { data: previousLobby, error: previousLobbyError } = await supabase
        .from('Tournament')
        .select('lobbyCode')
        .eq('createdById', user.id)
        .or('status.eq.active,status.eq.paused');

      if (previousLobbyError) {
        throw new Error(`Unable to check existing lobbies: ${previousLobbyError.message}`);
      }

      if (previousLobby?.[0]?.lobbyCode) {
        router.push(`/tournament/${previousLobby[0].lobbyCode}`);
        return;
      }

      const firstName = user.user_metadata?.northStarFirstName;
      const lastName = user.user_metadata?.northStarLastName;
      const instructorName =
        [firstName, lastName].filter(Boolean).join(' ') || user.email?.split('@')[0] || 'Instructor';

      const generatedLobbyCode = generateCode(_.map(tournaments ?? [], 'lobbyCode'));
      const { error: insertError } = await supabase.from('Tournament').insert({
        createdById: user.id,
        instructorName,
        lobbyCode: generatedLobbyCode,
        practiceRound: includePracticeRound
      });

      if (insertError) {
        throw new Error(`Unable to create the lobby: ${insertError.message}`);
      }

      router.push(`/tournament/${generatedLobbyCode}`);
    } catch (error) {
      console.error('Failed to create lobby:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Unable to create the lobby');
    } finally {
      setIsLoading(false);
    }
  };

  const signoutUser = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    setErrorMessage('');

    try {
      const { error } = await supabase.auth.signOut({ scope: 'local' });

      if (error) {
        throw error;
      }

      window.localStorage.removeItem('teamId');
      window.location.replace('/');
    } catch (error) {
      console.error('Failed to sign out instructor:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Unable to sign out. Please try again.');
      setIsSigningOut(false);
    }
  };

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [router, session]);

  return (
    <div className="w-full flex flex-col items-center gap-24">
      <div className="w-full flex items-center justify-between gap-6 max-w-7xl">
        <LogoGroup align="items-start" feHeight="max-h-5" dqHeight="max-h-9" gap="gap-3" />
        <div className="shrink-0 flex justify-end">
          <button type="button" className="[ dqButton ] bg-error" onClick={signoutUser} disabled={isSigningOut}>
            {isSigningOut ? 'signing out…' : 'sign out'}
          </button>
        </div>
      </div>
      <div className="relative w-full max-w-7xl">
        <div className="absolute w-full grid grid-cols-3 gap-12">
          <div></div>
          <div className="relative col-span-2">
            <img className="w-full" src="/lobby-illustration.svg" alt="" />
          </div>
        </div>
        <div className="relative w-full grid grid-cols-2 gap-12 z-10">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-3">
              <h1 className="text-white font-heading leading-snug text-5xl">Create new lobby</h1>
              <p className="text-lg">Select the settings to use for this game</p>
            </div>
            <div className="flex flex-col w-full gap-12">
              <label className="bg-alpha-850 p-6 rounded-lg flex items-center justify-between gap-6">
                <p className="text-xl">Include practise year?</p>
                <input
                  id="PracticeRound"
                  className="appearance-none relative w-12 h-12 bg-alpha-400 rounded-md border-2 border-alpha-400 duration-150
                    || after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-9 after:h-9 after:text-success-light after:rounded-sm after:opacity-0 after:duration-150
                    ||| checked:after:opacity-100 checked:border-success-light"
                  type="checkbox"
                  checked={includePracticeRound}
                  onChange={() => {
                    setIncludePracticeRoud(!includePracticeRound);
                  }}
                />
              </label>
              <div>
                <button type="button" onClick={CreateLobby} className="[ dqButton ]" disabled={isLoading}>
                  {isLoading ? (
                    <Ring size={20} color="#222430" />
                  ) : (
                    <span className="text-white"> create lobby and get code</span>
                  )}
                </button>
                {errorMessage && <p className="mt-4 text-error-light">{errorMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCreateGame;
