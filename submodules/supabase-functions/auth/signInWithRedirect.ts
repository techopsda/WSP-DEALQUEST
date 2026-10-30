import { redirect } from 'next/navigation';

export const signInWithRedirect = (redirectURL: string) => {
  return redirect('/sign-in?redirectURL=' + redirectURL);
};
