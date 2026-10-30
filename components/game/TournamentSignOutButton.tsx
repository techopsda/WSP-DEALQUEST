'use client';

import { useState } from 'react';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';

const clearLobbyState = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem('teamId');
};

export const TournamentSignOutButton = () => {
  const { supabase } = useSupabase<'public'>();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const signOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error } = await supabase.auth.signOut({ scope: 'local' });

      if (error) {
        throw error;
      }

      clearLobbyState();
      window.location.replace('/');
    } catch (error) {
      console.error('Failed to sign out from tournament lobby:', error);
      clearLobbyState();
      setIsSigningOut(false);
    }
  };

  return (
    <button
      type="button"
      className="[ dqButton ] fixed right-4 top-4 z-[100] bg-error shadow-xl"
      onClick={signOut}
      disabled={isSigningOut}
    >
      {isSigningOut ? 'signing out…' : 'sign out'}
    </button>
  );
};
