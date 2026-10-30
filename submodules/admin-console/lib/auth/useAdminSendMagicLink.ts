import { adminConsoleClientSendMagicLink } from './adminConsoleClientSendMagicLink';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Identifier } from 'ra-core';

export const useAdminSendMagicLink = (selectedIds: Identifier[], redirectUrl?: string, host?: string) => {
  const { supabase } = useSupabase<'access'>('access');

  return async () => await adminConsoleClientSendMagicLink(supabase, selectedIds, redirectUrl, host);
};
