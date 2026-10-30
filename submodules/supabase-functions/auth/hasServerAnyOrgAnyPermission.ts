import { createSupabaseServerClient } from '../lib/supabase-server';
import { hasOrgAnyPermission } from './hasOrgAnyPermission';

export const hasServerAnyOrgAnyPermission = async (
  organisationIds: string[] | null,
  permissions: string[]
): Promise<boolean> => {
  const supabase = await createSupabaseServerClient('public');
  const { data: sessionRes } = await supabase.auth.getSession();
  if (!sessionRes) return false;
  const { session } = sessionRes;

  return organisationIds && organisationIds?.length > 0
    ? organisationIds.some((orgId) => hasOrgAnyPermission(session, orgId, permissions))
    : hasOrgAnyPermission(session, undefined, permissions);
};
