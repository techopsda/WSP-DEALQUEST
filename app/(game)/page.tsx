'use client';
import useLocalStorage from '@/components/hooks/useLocalStorage';
import { InstructorSignIn } from '@/components/landing/InstructorSignIn';
import { JoinLobby } from '@/components/landing/JoinLobby';
import { RejoinLobby } from '@/components/landing/RejoinLobby';
import { LobbyLayout } from '@/components/lobby/LobbyLayout';
import { redirectUser } from '@/lib/auth/redirectUser';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Home = () => {
  const router = useRouter();
  const [teamId] = useLocalStorage('teamId', '');
  const { supabase, session } = useSupabase<'public'>();

  const [rejoinLobby, setRejoinLobby] = useState(false);

  useEffect(() => {
    redirectUser({ session, router, teamId, supabase });
  }, [session]);

  return (
    <LobbyLayout
      includeLogo
      includeCopy
      children={
        <>
          {!rejoinLobby && <JoinLobby />}
          {rejoinLobby && <RejoinLobby />}
          <hr className="border-alpha-400 my-6" />
          <div className="text-center">
            <button
              className="[ dqSecondaryButton ] text-sm border-bravo text-bravo"
              onClick={() => setRejoinLobby(!rejoinLobby)}
            >
              {!rejoinLobby ? 'Already have a team?' : 'Join a new game'}
            </button>
          </div>
        </>
      }
      footer={<InstructorSignIn />}
    />
  );
};

export default Home;
