import { Create, SimpleForm } from 'react-admin';
import { SupabaseResource } from '../types/SupabaseResource';
import { getCreateFieldsForResource } from '../lib/inputs/getCreateInputsForResource';

interface Props {
  resource: SupabaseResource;
  resources: SupabaseResource[];
}

export const DefaultCreate = ({ resource, resources }: Props) => {
  return (
    <Create>
      <SimpleForm>{getCreateFieldsForResource(resource, resources)}</SimpleForm>
    </Create>
  );
};
