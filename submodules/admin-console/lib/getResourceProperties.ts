import _ from 'lodash';
import { SupabaseResource } from '../types/SupabaseResource';

const DEFAULT_COLUMN_SORT_ORDER: Record<string, number> = {
  id: -99,
  createdAt: 100,
  createdById: 101,
  modifiedAt: 102,
  modifiedById: 103
};

export const getResourceProperties = (resource: SupabaseResource) => {
  const allProperties = [...resource.properties];

  // If the resource has relations, add those to the list
  if (resource.resourceConfig?.relations) {
    allProperties.push(
      ...Object.entries(resource.resourceConfig?.relations).map(([key, value]) => ({
        name: key,
        type: 'relation',
        format: value.type
      }))
    );
  }

  // First sort by the default sort order
  let orderedProperties = _.sortBy(allProperties, (property) => DEFAULT_COLUMN_SORT_ORDER[property.name] ?? 0);

  // Then overlay any custom sort order
  const customPropertyOrder = resource.resourceConfig?.propertyOrder;
  if (customPropertyOrder) {
    orderedProperties = orderedProperties.sort((a, b) => {
      const aIndex = customPropertyOrder.indexOf(a.name);
      const bIndex = customPropertyOrder.indexOf(b.name);
      if (aIndex === -1 || bIndex === -1) {
        return 0;
      }
      return aIndex - bIndex;
    });
  }

  return orderedProperties;
};
