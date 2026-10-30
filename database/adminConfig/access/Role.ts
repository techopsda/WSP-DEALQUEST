import { RelationStyle } from '@/submodules/admin-console/types/Config/RelationStyle';
import { RelationType } from '@/submodules/admin-console/types/Config/RelationType';
import { ResourceConfig } from '@/submodules/admin-console/types/Config/ResourceConfig';

export const Role: ResourceConfig = {
  relations: {
    Permissions: {
      type: RelationType.ManyToMany,
      reference: 'Permission',
      through: 'RolePermission',
      using: 'roleId,permissionId'
    }
  }
};
