'use client';

import { useSupabase } from './SupabaseProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface WaitForSession {
  redirectUrl: string;
}

export const WaitForSession: React.FC<WaitForSession> = ({ redirectUrl }) => {
  const { replace, refresh } = useRouter();
  const { session, supabase } = useSupabase();

  useEffect(() => {
    const setAuth = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const access_token = hashParams.get('access_token');
      const refresh_token = hashParams.get('refresh_token');

      if (access_token && refresh_token) {
        await supabase.auth.setSession({
          access_token,
          refresh_token
        });
      }
    };

    if (session) {
      replace(redirectUrl);
      refresh();
    }

    if (window !== undefined) setAuth();
  }, [session, replace, typeof window === 'undefined']);

  return null;
};
