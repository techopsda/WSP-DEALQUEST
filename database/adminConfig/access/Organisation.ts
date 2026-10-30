import { RelationStyle } from '@/submodules/admin-console/types/Config/RelationStyle';
import { RelationType } from '@/submodules/admin-console/types/Config/RelationType';
import { ResourceConfig } from '@/submodules/admin-console/types/Config/ResourceConfig';

export const Organisation: ResourceConfig = {
  relations: {
    Users: {
      type: RelationType.ManyToMany,
      reference: 'User',
      through: 'UserOrganisation',
      using: 'organisationId,userId'
    }
  }
};
