import { Session } from '@supabase/supabase-js';

export const getUserOrgIDs = (session: Session | null): string[] => {
  const userOrgs = session?.user?.app_metadata?.access?.orgs ?? [];
  return userOrgs.map((userOrg: any) => userOrg.orgId);
};
