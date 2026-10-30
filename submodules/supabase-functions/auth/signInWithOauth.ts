import { Provider, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

export const signInWithOauth = async (
  provider: Provider,
  redirectPath: string,
  supabase: SupabaseClient<Database, 'public'>
) => {
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?redirect=${redirectPath}`
    }
  });
};
