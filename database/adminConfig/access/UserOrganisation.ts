import { RelationStyle } from '@/submodules/admin-console/types/Config/RelationStyle';
import { RelationType } from '@/submodules/admin-console/types/Config/RelationType';
import { ResourceConfig } from '@/submodules/admin-console/types/Config/ResourceConfig';

export const UserOrganisation: ResourceConfig = {
  relations: {
    Roles: {
      type: RelationType.ManyToMany,
      reference: 'Role',
      through: 'UserOrganisationRole',
      using: 'userOrganisationId,roleId'
    }
  },
  recordRepresentation: (record) => `${record.userId} - ${record.organisationId}`
};
