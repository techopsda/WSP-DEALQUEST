import { Session } from '@supabase/auth-helpers-nextjs';
import { getAllPermissions } from './getAllPermissions';

export const hasOrgAnyPermission = (
  session: Session | null,
  organisationId: string | undefined,
  permissions: string[]
): boolean => {
  const allPermissions = getAllPermissions(session, organisationId);
  return permissions.some((permission) => (allPermissions ?? []).includes(permission));
};
