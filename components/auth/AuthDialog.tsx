import Link from 'next/link';
import NorthLinkLogo from '../admin/NorthLinkLogo';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import GoogleSignIn from './GoogleSignIn';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Ring } from '@uiball/loaders';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';

const coverImage = '/NS_Login_Bg.png';

export const AuthDialog: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputClasses = 'px-3 py-4 rounded-md text-gray-900';
  const path = usePathname();
  const [checkEmail, setCheckEmail] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [checkPassword, setCheckPassword] = useState('');
  const [passwordsDoNoMatch, setPasswordsDoNotMatch] = useState(false);
  const [loading, setLoading] = useState('');
  const { supabase } = useSupabase<'public'>();

  const handleSignIn = async () => {
    setLoading('signIn');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading('');
      alert(error);
    }

    if (!error && path?.includes('/login') && process.env.NEXT_PUBLIC_SITE_URL) {
      window.location.replace(process.env.NEXT_PUBLIC_SITE_URL);
    }

    console.log('data', data);
    console.log('error', error);
  };

  const handleSignUp = async () => {
    setLoading('signUp');
    if (password.length > 0 && password === checkPassword) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        setLoading('');
        alert(error);
      }

      if (!error) {
        setCheckEmail(true);
      }
    } else {
      setPasswordsDoNotMatch(true);
    }

    setLoading('');
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signUp) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  const handleForgottenPassword = async () => {
    setLoading('password');

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/forgotten-password`
    });
    if (error) {
      setLoading('');
      alert(error);
    }

    if (!error) {
      setCheckEmail(true);
      setLoading('');
    }
  };

  const handleAzureSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email',
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/authenticated`
      }
    });
    if (error) {
      alert(error);
    }
  };

  return (
    <section className="grow h-full bg-nsAdmin-800 grid grid-cols-1 md:grid-cols-2">
      <div className="w-full flex flex-col justify-center items-start gap-6 p-6 md:p-12">
        <NorthLinkLogo className="text-white h-9" />
        <form onSubmit={handleFormSubmit} className="w-full">
          <div className="flex flex-col gap-1 text-white w-full">
            <label className="text-nsAdmin-50" htmlFor="login-email">
              Email address
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={inputClasses}
              id="login-email"
              type="text"
              placeholder="Enter your email address"
            />
          </div>
          <div className="flex flex-col gap-1 text-white w-full">
            <label className="text-nsAdmin-50" htmlFor="login-password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={inputClasses}
              id="login-password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          {signUp && (
            <div className="relative flex flex-col gap-1 text-white w-full">
              <label className="text-nsAdmin-50" htmlFor="login-password">
                Check Password
              </label>
              <div className="flex h-full items-center w-full justify-between">
                <input
                  value={checkPassword}
                  onChange={(e) => {
                    setCheckPassword(e.target.value);
                  }}
                  className={`${inputClasses} w-full`}
                  id="login-check-pasword"
                  type="password"
                  placeholder="Re enter your new password"
                />
                {checkPassword.length > 0 && password === checkPassword && (
                  <CheckCircleIcon
                    title="Passwords are the same"
                    className="h-6 w-6 absolute right-6 text-nsAdmin-900"
                  />
                )}
                {checkPassword.length > 0 && password !== checkPassword && (
                  <XCircleIcon
                    title="Passwords are not the same"
                    className="h-6 w-6 absolute right-6 text-nsAdmin-900"
                  />
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between w-full">
            <div
              onClick={() => {
                handleForgottenPassword();
              }}
              className={`${
                !signUp ? '' : 'invisible'
              } text-nsAdmin-50 text-sm | hover:underline cursor-pointer flex items-center gap-3 relative`}
            >
              Forgotten password?{' '}
              {loading === 'password' && (
                <div className="absolute -right-6">
                  <Ring size={16} color="white" />
                </div>
              )}
            </div>
            <div
              onClick={() => {
                setSignUp(!signUp);
                setCheckEmail(false);
                setCheckPassword('');
                setPasswordsDoNotMatch(false);
              }}
              className="text-nsAdmin-50 text-sm | hover:underline cursor-pointer"
            >
              {!signUp ? 'Sign Up' : 'Already have an account? Login here'}
            </div>
            <button
              type="submit"
              className="[ ns-admin-button ] bg-white hover:text-nsAdmin-900 | hover:bg-nsAdmin-50 flex items-center relative w-28"
            >
              {!(loading === 'signUp') && !(loading === 'signIn') ? (!signUp ? 'Login' : 'Sign Up') : ''}{' '}
              {(loading === 'signUp' || loading === 'signIn') && <Ring size={20} color="black" />}
            </button>
          </div>
        </form>

        <>
          <div className={`${!signUp ? '' : 'invisible'} pl-12 w-full flex justify-center`}>
            <button onClick={handleAzureSignIn}>
              <GoogleSignIn />
            </button>
          </div>

          <div className={`${!checkEmail ? 'invisible' : ''} pl-12 w-full flex flex-col items-center text-white`}>
            <p>Check your email for a link</p>
            <p
              onClick={() => {
                if (!signUp) {
                  handleForgottenPassword();
                } else {
                  handleSignUp();
                }
              }}
              className="cursor-pointer"
            >
              No email? <span className="underline">click here to resend</span>
            </p>
          </div>
          <span
            className={`${
              passwordsDoNoMatch && password !== checkPassword ? '' : 'invisible'
            } flex w-full justify-center text-white`}
          >
            {password.length > 0 ? 'Passwords entered do not match' : 'No password entered'}
          </span>
        </>
      </div>
      <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${coverImage})` }}>
        <div className="absolute inset-0 bg-nsAdmin-900 mix-blend-multiply opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-nsAdmin-900 to-transparent mix-blend-multiply opacity-80"></div>
        <svg
          className="absolute text-nsAdmin-800 h-full w-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 60 1117"
        >
          <path fill="currentColor" fillRule="evenodd" d="M.511 0H0v1117h59.05L.512 0Z" clipRule="evenodd" />
        </svg>
        <Link
          href="https://northlink.digital"
          target="_blank"
          rel="noopener"
          className="absolute bottom-0 right-0 -translate-x-6 -translate-y-6 flex flex-col items-end gap-2"
        >
          <p className="text-xs text-white">Designed and built by;</p>
          <NorthLinkLogo className="text-white h-7" />
        </Link>
      </div>
    </section>
  );
};
