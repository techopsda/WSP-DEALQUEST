'use client';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LobbyInput } from '../lobby/LobbyInput';
import { AiOutlineCheck } from 'react-icons/ai';

export const UpdatePasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { supabase } = useSupabase<'public'>();

  const router = useRouter();

  const letterReg = new RegExp('[A-Za-z]');
  const digitReg = new RegExp('[0-9]');
  const specialCharReg = new RegExp('[@$!%*#?&]');
  const lengthReg = new RegExp('.{8,}');
  const isLetterPresent = letterReg.test(newPassword);
  const isDigitPresent = digitReg.test(newPassword);
  const isSpecialCharPresent = specialCharReg.test(newPassword);
  const hasMinLength = lengthReg.test(newPassword);

  const handleUpdatePassword = async () => {
    const { data, error: errorUpdateUserPassword } = await supabase.auth.updateUser({ password: newPassword });
    if (errorUpdateUserPassword) {
      console.log(errorUpdateUserPassword.message, 'error');
    } else if (data) {
      router.push(`${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/tournament/create-game`);
    }
  };
  const isDisabled =
    !hasMinLength || !isSpecialCharPresent || !isDigitPresent || !isLetterPresent || newPassword !== confirmPassword;

  return (
    <>
      <form className="flex flex-col gap-9 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-white font-heading leading-snug text-5xl">Update your password</h1>
          {/* <p className="text-lg">Enter your email address to reset your password</p> */}
        </div>
        <div className="flex flex-col gap-6">
          <LobbyInput
            type="password"
            placeholder="Password"
            fontSize="text-base"
            padding="p-4"
            value={newPassword}
            onChange={(e) => {
              e.preventDefault();
              setNewPassword(e.target.value);
            }}
          />
          {/* <div>{passwordError}</div> */}
          <LobbyInput
            type="password"
            placeholder="Confirm Password"
            fontSize="text-base"
            padding="p-4"
            value={confirmPassword}
            onChange={(e) => {
              e.preventDefault();
              setConfirmPassword(e.target.value);
            }}
          />
          <div>
            <button onClick={handleUpdatePassword} disabled={isDisabled} type="button" className="[ dqButton ]">
              Reset password
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-6">
            <div>
              <Link href="/login" className="text-white hover:underline">
                Cancel reset and return to login
              </Link>
            </div>
            <div className="grid grid-colls-1 justify-items-center">
              <div className="flex flex-col  items-start">
                <div className="flex items-center">
                  At least 8 characters : {hasMinLength && <AiOutlineCheck className="w-4 h-4 text-success" />}
                </div>
                <div className="flex items-center">
                  At least 1 special character:{' '}
                  {isSpecialCharPresent && <AiOutlineCheck className="w-4 h-4 text-success" />}
                </div>
                <div className="flex items-center">
                  At least 1 number: {isDigitPresent && <AiOutlineCheck className="w-4 h-4 text-success" />}
                </div>
                <div className="flex items-center">
                  {' '}
                  At least 1 Capital Letter: {isLetterPresent && <AiOutlineCheck className="w-4 h-4 text-success" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
