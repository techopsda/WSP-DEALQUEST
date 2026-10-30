import { useSupabase } from '../../components/SupabaseProvider';
import { FORM_ERROR } from 'final-form';

export interface UpdatePasswordFormValues {
  password: string;
  passwordConfirmation: string;
}

export const useUpdatePasswordSubmit = (onSuccess?: () => void | Promise<void>) => {
  const { supabase } = useSupabase<'public'>();

  return async (formValues: UpdatePasswordFormValues) => {
    const { error } = await supabase.auth.updateUser(formValues);
    if (error) return { [FORM_ERROR]: error.message };
    onSuccess && (await onSuccess());
  };
};
