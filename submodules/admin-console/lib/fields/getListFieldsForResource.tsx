import { SupabaseResource } from '../../types/SupabaseResource';
import { getListFieldsFromProperties } from './getListFieldsFromProperties';
import { getResourceProperties } from '../getResourceProperties';

export const getListFieldsForResource = (resource: SupabaseResource) => {
  const listProperties = getResourceProperties(resource).filter((property) => property?.propertyConfig?.list !== false);
  return getListFieldsFromProperties(listProperties, resource);
};
