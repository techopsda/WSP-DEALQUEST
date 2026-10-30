import { SupabaseResource } from '../../types/SupabaseResource';
import { getResourceProperties } from '../getResourceProperties';
import { getShowFieldsFromProperties } from './getShowFieldsFromProperties';

export const getShowFieldsForResource = (resource: SupabaseResource) => {
  const showProperties = getResourceProperties(resource).filter((property) => property?.propertyConfig?.show !== false);

  // TODO - filter fields based on which should appear in show form

  return getShowFieldsFromProperties(showProperties, resource);
};
