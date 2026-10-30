import { useSupabase } from '../../components/SupabaseProvider';
import { FORM_ERROR } from 'final-form';
import { useRouter } from 'next/navigation';

interface SignInWithPasswordForm {
  email: string;
  password: string;
}

export const useSignInWithPasswordSubmit = (redirectUrl?: string) => {
  const { supabase } = useSupabase<'public'>();
  const router = useRouter();
  return async (formValues: SignInWithPasswordForm) => {
    const { error } = await supabase.auth.signInWithPassword(formValues);

    // If Supabase error's then we want to return an error that final form can recognise.
    // https://final-form.org/docs/final-form/api#form_error
    if (error) return { [FORM_ERROR]: error.message };

    // Redirect to the authenticated page to sort out session details.
    // Uses the host from the current URL to ensure we're on the correct domain.
    const { origin } = new URL(window.location.href);
    return router.replace(`${origin}/authenticated?redirectUrl=${redirectUrl ?? origin}`);
  };
};
