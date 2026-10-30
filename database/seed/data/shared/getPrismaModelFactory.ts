import { PrismaClient } from '@prisma/client';
import {
  defineOrganisationFactory,
  definePermissionFactory,
  defineRoleFactory,
  defineRolePermissionFactory,
  initialize
} from '../../../generated/factories';

const prisma = new PrismaClient();
initialize({ prisma });

// Access Specific Model Factories
export const RoleFactory = defineRoleFactory();
export const PermissionFactory = definePermissionFactory();
export const RolePermissionFactory = defineRolePermissionFactory({
  defaultData: {
    role: RoleFactory,
    permission: PermissionFactory
  }
});
export const OrganisationFactory = defineOrganisationFactory();
