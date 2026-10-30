import { hasServerOrgAnyPermission } from './hasServerOrgAnyPermission';

export const hasServerAnyOrgPermission = async (
  organisationIds: string[] | null,
  permission: string
): Promise<boolean> => {
  const results = await Promise.all(
    organisationIds?.map(async (orgId) => {
      return await hasServerOrgAnyPermission(orgId, [permission]);
    }) ?? []
  );

  return organisationIds && organisationIds?.length > 0
    ? results.some((result) => result === true)
    : hasServerOrgAnyPermission(undefined, [permission]);
};
