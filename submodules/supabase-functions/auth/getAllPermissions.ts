import { Session } from '@supabase/auth-helpers-nextjs';

export const getAllPermissions = (session: Session | null, organisationId?: string) => {
  const appMetadata = session?.user?.app_metadata;
  const userId = session?.user?.id;
  if (!appMetadata || !userId) return [];
  const globalRoles = appMetadata?.access?.roles ?? [];
  const org = organisationId
    ? (appMetadata?.access?.orgs ?? []).find((org: any) => org.orgId === organisationId)
    : undefined;
  const orgRoles = org?.roles ?? [];
  const allRoles = [...globalRoles, ...orgRoles];
  const allPermissions = allRoles.flatMap((role: any) => role.permissions);
  return allPermissions;
};
