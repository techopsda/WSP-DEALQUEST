import { useSupabase } from '../../components/SupabaseProvider';
import { FORM_ERROR } from 'final-form';
import _ from 'lodash';

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const useRegisterSubmit = (redirectUrl?: string, onSuccess?: () => void | Promise<void>) => {
  const { supabase } = useSupabase<'public'>();

  return async (formValues: RegisterFormValues) => {
    const { origin } = new URL(window.location.href);

    const { error } = await supabase.auth.signUp({
      ..._.omit(formValues, ['firstName', 'lastName']),
      options: {
        data: {
          emailRedirectTo: `${origin}/auth/callback?redirect=authenticated?redirectUrl=${redirectUrl ?? origin}`,
          signUpHost: origin,
          lastSignInHost: origin,
          northStarFirstName: formValues.firstName,
          northStarLastName: formValues.lastName
        }
      }
    });

    // If Supabase error's then we want to return an error that final form can recognise.
    // https://final-form.org/docs/final-form/api#form_error
    if (error) return { [FORM_ERROR]: error.message };
    onSuccess && (await onSuccess());
  };
};
