'use client';

import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import Link from 'next/link';
import { useState } from 'react';
import { LobbyInput } from '../lobby/LobbyInput';

export const ForgottenPasswordForm = () => {
  const [email, setEmail] = useState('');
  const { supabase } = useSupabase<'public'>();
  const [message, setMesssage] = useState('');

  const handleForgottenPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${
        process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
      }/auth/callback?redirect=/update-password`
    });
    if (error) {
      console.log(error);
    }

    if (!error) {
      setMesssage('Check your email for instruction on how to reset your password.');
    }
  };

  return (
    <>
      <form className="flex flex-col gap-9 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-white font-heading leading-snug text-5xl">Forgotten password</h1>
          <p className="text-lg">Enter your email address to reset your password</p>
        </div>
        <div className="flex flex-col gap-6">
          <LobbyInput
            type="email"
            placeholder="Enter your email address"
            fontSize="text-base"
            padding="p-4"
            value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
          />
          <div>
            <button onClick={handleForgottenPassword} type="button" className="[ dqButton ]">
              Reset password
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-6">
            <div>
              <Link href="/login" className="text-white hover:underline">
                Cancel reset and return to login
              </Link>
            </div>
            {message && <p>{message}</p>}
          </div>
        </div>
      </form>
    </>
  );
};
