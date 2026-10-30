import { RelationStyle } from '@/submodules/admin-console/types/Config/RelationStyle';
import { RelationType } from '@/submodules/admin-console/types/Config/RelationType';
import { ResourceConfig } from '@/submodules/admin-console/types/Config/ResourceConfig';

export const Permission: ResourceConfig = {
  relations: {
    Roles: {
      type: RelationType.ManyToMany,
      reference: 'Role',
      through: 'RolePermission',
      using: 'permissionId,roleId'
    }
  }
};
