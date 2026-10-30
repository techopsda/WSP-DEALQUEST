'use client';

import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import DealQuestLogo from '../shared/DealQuestLogo';
import FELogo from '../shared/FELogo';

export const Header: React.FC = () => {
  const { supabase, session } = useSupabase<'public'>();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOutClick = async () => {
    if (!session || isSigningOut) return;

    setIsSigningOut(true);
    const { error } = await supabase.auth.signOut({ scope: 'local' });
    if (error) {
      console.error('Failed to sign out admin user:', error);
      setIsSigningOut(false);
      return;
    }

    window.location.replace('/admin/login');
  };

  return (
    <header className="relative w-full bg-nsAdmin-900 shadow-sm z-30 flex items-center justify-between gap-24 px-3 md:px-6">
      <Link href="/" className="shrink-0 py-8">
        <div className="flex flex-col items-start gap-3">
          <FELogo className={`text-alpha-light-800 w-auto h-4`} />
          <DealQuestLogo className={`w-auto h-8`} />
        </div>
      </Link>

      {session ? (
        <button type="button" onClick={handleSignOutClick} disabled={isSigningOut}>
          <div
            className={clsx(
              'cursor-pointer group flex relative z-20 items-center gap-2 font-heading font-semibold duration-150 text-nsAdmin-50 | hover:text-white'
            )}
          >
            <span className="relative py-9">{isSigningOut ? 'Signing Out…' : 'Sign Out'}</span>
            <ArrowRightIcon className="w-4 h-4 duration-150 | group-hover:translate-x-1" />
          </div>
        </button>
      ) : (
        <Link href="/admin/login">
          <div
            className={clsx(
              'cursor-pointer group flex relative z-20 items-center gap-2 font-heading font-semibold duration-150 text-nsAdmin-50 | hover:text-white'
            )}
          >
            <span className="relative py-9">Sign In</span>
            <ArrowRightIcon className="w-4 h-4 duration-150 | group-hover:translate-x-1" />
          </div>
        </Link>
      )}
    </header>
  );
};

export default Header;
