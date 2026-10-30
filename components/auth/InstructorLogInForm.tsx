'use client';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LobbyInput } from '../lobby/LobbyInput';
import { AzureSignIn } from './AzureSignIn';
import { Ring } from '@uiball/loaders';

export const InstructorSignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { supabase } = useSupabase<'public'>();
  const [message] = useState('');
  const router = useRouter();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsloading(true);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });

      if (loginError) {
        alert(loginError.message);
        return;
      }

      router.replace('/authenticated');
      router.refresh();
    } catch (error) {
      console.error('Unable to connect to Supabase during login:', error);
      alert(error instanceof Error ? error.message : 'Unable to connect to Supabase');
    } finally {
      setIsloading(false);
    }
  };

  const handleAzureSignIn = async () => {
    setIsloading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          scopes: 'email',
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/authenticated`
        }
      });

      if (error) {
        alert(error.message);
      }
    } catch (error) {
      console.error('Unable to connect to Supabase during Azure login:', error);
      alert(error instanceof Error ? error.message : 'Unable to connect to Supabase');
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-9 text-center">
        {/* Code needs updating to include a form tag */}
        <div className="flex flex-col gap-4">
          <h1 className="text-white font-heading leading-snug text-5xl">Instructor login</h1>
          <p className="text-lg">Please login to setup and create a new game</p>
        </div>
        <div className="flex flex-col gap-6">
          <button onClick={handleAzureSignIn}>
            <AzureSignIn />
          </button>

          <div className="flex items-center gap-6 my-3">
            <hr className="flex-grow border-alpha-highlight border-1" />
            <span className="text-alpha-highlight"> or </span>
            <hr className="flex-grow border-alpha-highlight border-1" />
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
            <LobbyInput
              type="password"
              placeholder="Enter you password"
              fontSize="text-base"
              padding="p-4"
              value={password}
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            />
            <div>
              <button onClick={handleLogin} type="submit" className="[ dqButton ] items-center gap-4">
                {isLoading ? <Ring size={20} color="#222430" /> : <span className="text-white">login</span>}
              </button>
            </div>
            <div className="mt-3 flex flex-col gap-6">
              <div>
                <Link href="/forgotten-password" className="text-white hover:underline">
                  Forgotten password?
                </Link>
              </div>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
