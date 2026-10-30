import { Session } from '@supabase/auth-helpers-nextjs';
import { hasOrgAnyPermission } from './hasOrgAnyPermission';

export const hasOrgPermission = (
  session: Session | null,
  organisationId: string | undefined,
  permission: string
): boolean => {
  return hasOrgAnyPermission(session, organisationId, [permission]);
};
