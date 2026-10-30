import { createSupabaseServerClient } from '../lib/supabase-server';
import { hasOrgAnyPermission } from './hasOrgAnyPermission';

export const hasServerOrgAnyPermission = async (
  organisationId: string | undefined,
  permissions: string[]
): Promise<boolean> => {
  const supabase = await createSupabaseServerClient('public');
  const { data: sessionRes } = await supabase.auth.getSession();
  if (!sessionRes) return false;
  const { session } = sessionRes;
  return hasOrgAnyPermission(session, organisationId, permissions);
};
