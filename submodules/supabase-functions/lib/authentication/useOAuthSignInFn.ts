import { useSupabase } from '../../components/SupabaseProvider';
import { Provider } from '@supabase/supabase-js';

export const useOAuthSignInFn = (provider: Provider, redirectUrl?: string) => {
  const { supabase } = useSupabase<'public'>();
  return async () => {
    const { origin } = new URL(window.location.href);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${origin}/auth/callback?redirect=/authenticated?redirectUrl=${redirectUrl ?? origin}`
      }
    });
    if (error) {
      alert(error);
    }
  };
};
