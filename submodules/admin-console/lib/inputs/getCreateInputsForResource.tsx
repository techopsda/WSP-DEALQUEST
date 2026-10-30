import { SupabaseResource } from '../../types/SupabaseResource';
import { getResourceProperties } from '../getResourceProperties';
import { determineFieldInput } from './determineFieldInput';

export const getCreateFieldsForResource = (resource: SupabaseResource, resources: SupabaseResource[]) => {
  const properties = getResourceProperties(resource).filter((property) => property?.propertyConfig?.create !== false);
  const filteredProperties = properties.filter(
    (p) =>
      p.name !== 'id' &&
      p.name !== 'createdAt' &&
      p.name !== 'modifiedAt' &&
      p.name !== 'createdById' &&
      p.name !== 'modifiedById'
  );
  return filteredProperties.map((property) => determineFieldInput(property, resource, resources));
};
