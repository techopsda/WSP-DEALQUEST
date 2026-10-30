import { SchemaConfig } from '@/submodules/admin-console/types/Config/SchemaConfig';
import { Organisation } from './Organisation';
import { Permission } from './Permission';
import { Role } from './Role';
import { RolePermission } from './RolePermission';
import { User } from './User';
import { UserOrganisation } from './UserOrganisation';
import { UserOrganisationRole } from './UserOrganisationRole';

export const access: SchemaConfig = {
  resourcesConfig: {
    User,
    Organisation,
    UserOrganisation,
    RolePermission,
    Permission,
    Role,
    UserOrganisationRole
  }
};
