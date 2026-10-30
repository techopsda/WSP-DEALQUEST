'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';

export const AdminAccessDenied = () => {
  const { supabase } = useSupabase<'public'>();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState('');

  const useAnotherAccount = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    setSignOutError('');

    const { error } = await supabase.auth.signOut({ scope: 'local' });
    if (error) {
      console.error('Failed to sign out non-admin user:', error);
      setSignOutError(error.message);
      setIsSigningOut(false);
      return;
    }

    window.location.replace('/admin/login');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-nsAdmin-800 p-6 text-white">
      <div className="max-w-lg rounded-xl bg-nsAdmin-900 p-8 shadow-2xl">
        <h1 className="font-heading text-4xl">Admin access required</h1>
        <p className="mt-4 text-nsAdmin-50">
          Your account is signed in but does not have the Admin or SuperAdmin role.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            className="[ ns-admin-button ] bg-white text-nsAdmin-900"
            onClick={useAnotherAccount}
            disabled={isSigningOut}
          >
            {isSigningOut ? 'Signing out…' : 'Use another account'}
          </button>
          <Link className="[ ns-admin-button ] border border-white" href="/">
            Return home
          </Link>
        </div>
        {signOutError && (
          <p className="mt-4 text-error-light" role="alert">
            {signOutError}
          </p>
        )}
      </div>
    </main>
  );
};
