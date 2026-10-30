import { useSupabase } from '../../components/SupabaseProvider';
import { FORM_ERROR } from 'final-form';

export type ForgotPasswordFormValues = {
  email: string;
};

export const useForgotPasswordSubmit = (resetPasswordUrl?: string, onSuccess?: () => void | Promise<void>) => {
  const { supabase } = useSupabase<'public'>();

  return async (formValues: ForgotPasswordFormValues) => {
    const { origin } = new URL(window.location.href);

    const { error } = await supabase.auth.resetPasswordForEmail(formValues.email, {
      redirectTo: `${origin}/authenticated?redirectUrl=${resetPasswordUrl ?? 'reset-password'}`
    });
    if (error) return { [FORM_ERROR]: error.message };

    onSuccess && (await onSuccess());
  };
};
