import { CustomActionResponse } from '../../types/Config/CustomActionResponse';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import axios, { AxiosError } from 'axios';
import { Identifier } from 'ra-core';

export const adminConsoleClientSendMagicLink = async (
  supabase: SupabaseClient<Database, 'access'>,
  selectedIds: Identifier[],
  redirectUrl?: string,
  host?: string
): Promise<CustomActionResponse> => {
  try {
    const { data: userObject } = await supabase
      .from('User')
      .select()
      .eq('id', selectedIds[0] as string)
      .single();

    if (!userObject?.email) return { message: 'No email associated with user', type: 'error' };

    const {
      data: { error }
    } = await axios.post('/api/auth/sendUserMagicLink', { email: userObject?.email, redirectUrl, host });

    if (error) throw { message: 'An error occurred sending magic link', type: 'error' };

    return { message: 'Successfully sent magic link to user', type: 'success' };
  } catch (e) {
    if (e instanceof AxiosError) throw { message: e.response?.statusText, type: 'error' };

    throw { message: 'An error occurred', type: 'error' };
  }
};
