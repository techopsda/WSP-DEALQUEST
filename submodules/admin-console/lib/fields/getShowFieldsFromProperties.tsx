import { Property } from '../../types/Property';
import { SupabaseResource } from '../../types/SupabaseResource';
import { getSharedFieldFromProperty } from './getSharedFieldFromProperty';

export const getShowFieldsFromProperties = (properties: Property[], resource: SupabaseResource) => {
  return properties.map((property) => {
    return getSharedFieldFromProperty(property, resource, 'show');
  });
};
