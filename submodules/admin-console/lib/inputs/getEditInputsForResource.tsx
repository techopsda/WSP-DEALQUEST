import * as React from 'react';
import { SupabaseResource } from '../../types/SupabaseResource';
import { determineFieldInput } from './determineFieldInput';
import { getResourceProperties } from '../getResourceProperties';

export const getEditFieldsForResource = (resource: SupabaseResource, resources: SupabaseResource[]) => {
  const properties = getResourceProperties(resource);
  const filteredProperties = properties.filter(
    (property) =>
      property.name !== 'id' &&
      property.name !== 'createdAt' &&
      property.name !== 'modifiedAt' &&
      property.name !== 'createdById' &&
      property.name !== 'modifiedById' &&
      property?.propertyConfig?.edit !== false
  );

  return filteredProperties.map((property) =>
    // ensure each returned input element has a unique key
    // determineFieldInput returns a React element
    React.cloneElement(determineFieldInput(property, resource, resources) as React.ReactElement, {
      key: property.name,
    })
  );
};
