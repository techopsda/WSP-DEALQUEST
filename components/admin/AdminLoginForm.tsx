'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Ring } from '@uiball/loaders';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { hasAdminAccess } from '@/lib/auth/hasAdminAccess';
import DealQuestLogo from '@/components/shared/DealQuestLogo';
import FELogo from '@/components/shared/FELogo';

export const AdminLoginForm = () => {
  const { supabase } = useSupabase<'public'>();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.session) {
        setErrorMessage(error?.message ?? 'Unable to create an administrator session.');
        return;
      }

      const { data: refreshedData } = await supabase.auth.refreshSession();
      const session = refreshedData.session ?? data.session;

      if (!hasAdminAccess(session)) {
        const { error: signOutError } = await supabase.auth.signOut({ scope: 'local' });
        if (signOutError) {
          throw signOutError;
        }
        setErrorMessage('This account does not have the Admin or SuperAdmin role.');
        return;
      }

      router.replace('/admin');
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to connect to Supabase.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-nsAdmin-800 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md flex-col justify-center">
        <div className="mb-10 flex flex-col items-start gap-3">
          <FELogo className="h-5 w-auto text-alpha-light-800" />
          <DealQuestLogo className="h-10 w-auto" />
        </div>

        <div className="rounded-xl bg-nsAdmin-900 p-8 shadow-2xl">
          <div className="mb-8">
            <h1 className="font-heading text-4xl">Admin sign in</h1>
            <p className="mt-3 text-nsAdmin-50">Use an account assigned the Admin or SuperAdmin role.</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2">
              <span>Email address</span>
              <input
                className="rounded-md px-4 py-3 text-gray-900"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span>Password</span>
              <input
                className="rounded-md px-4 py-3 text-gray-900"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            {errorMessage && (
              <p className="rounded-md bg-error/30 p-3 text-sm text-white" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              className="[ ns-admin-button ] flex min-h-12 items-center justify-center bg-white text-nsAdmin-900"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Ring size={20} color="#222430" /> : 'Sign in to admin'}
            </button>
          </form>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-nsAdmin-50">
            <Link className="hover:text-white hover:underline" href="/forgotten-password">
              Forgotten password?
            </Link>
            <Link className="hover:text-white hover:underline" href="/login">
              Instructor sign in
            </Link>
            <Link className="hover:text-white hover:underline" href="/">
              Player home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
