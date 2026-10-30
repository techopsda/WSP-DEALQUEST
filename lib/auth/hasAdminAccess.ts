import type { Session } from '@supabase/auth-helpers-nextjs';

const ADMIN_PERMISSIONS = new Set(['canManageAccess', 'canManageContent']);

export const hasAdminAccess = (session: Session | null | undefined) => {
  const access = session?.user?.app_metadata?.access;
  if (process.env.NODE_ENV !== 'production' && access?.bypassed === true) return true;

  const globalRoles = access?.roles ?? [];
  const organisationRoles = (access?.orgs ?? []).flatMap((organisation: any) => organisation.roles ?? []);
  const permissions = [...globalRoles, ...organisationRoles].flatMap((role: any) => role.permissions ?? []);

  return permissions.some((permission: string) => ADMIN_PERMISSIONS.has(permission));
};
