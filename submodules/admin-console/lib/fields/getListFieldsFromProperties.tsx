import { FunctionField } from 'react-admin';
import { AuditField } from '../../components/fields/AuditField';
import { IDField } from '../../components/fields/IDField';
import { Property } from '../../types/Property';
import { SupabaseResource } from '../../types/SupabaseResource';
import { getSharedFieldFromProperty } from './getSharedFieldFromProperty';

export const getListFieldsFromProperties = (properties: Property[], resource: SupabaseResource) => {
  return properties.map((property) => {
    if (property.name === 'id') {
      return <IDField key={property?.name} source={property.name} />;
    } else if (property.name === 'createdAt') {
      return (
        <FunctionField
          key={property?.name}
          label="Audit"
          sortBy="modifiedAt"
          render={(record: { createdAt: string; modifiedAt: string; createdById: string; modifiedById: string }) => (
            <AuditField record={record} />
          )}
        />
      );
    } else if (property.name !== 'modifiedAt' && property.name !== 'modifiedById' && property.name !== 'createdById') {
      return getSharedFieldFromProperty(property, resource, 'list');
    }
  });
};
