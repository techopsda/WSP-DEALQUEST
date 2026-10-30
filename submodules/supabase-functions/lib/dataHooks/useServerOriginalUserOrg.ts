import { createSupabaseServerClient } from '../supabase-server';
import { Session } from '@supabase/supabase-js';
import { use } from 'react';

export const useServerOriginalUserOrg = (session: Session | null) => {
  const sessionUser = session?.user;

  const fetchUsersOriginalOrg = async () => {
    const accessSupabase = await createSupabaseServerClient<'access'>('access');
    const { data: orgResponse } = await accessSupabase
      .from('UserOrganisation')
      .select('*, Organisation!inner(*)')
      .eq('Organisation.name', sessionUser?.id as string)
      .maybeSingle();

    return orgResponse;
  };

  return use(fetchUsersOriginalOrg());
};
