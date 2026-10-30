import { hasServerOrgAnyPermission } from './hasServerOrgAnyPermission';

export const hasServerOrgPermission = async (
  organisationId: string | undefined,
  permission: string
): Promise<boolean> => {
  return hasServerOrgAnyPermission(organisationId, [permission]);
};
