import { createSupabaseServerClient } from '../lib/supabase-server';
import { User } from '@supabase/auth-helpers-nextjs';
import { use } from 'react';

export const getServerSessionUser = async (): Promise<User | undefined> => {
  const supabase = await createSupabaseServerClient('public');
  const { data: sessionRes } = await supabase.auth.getSession();
  return sessionRes?.session?.user;
};

export const useServerSessionUser = () => {
  return use(getServerSessionUser());
};
