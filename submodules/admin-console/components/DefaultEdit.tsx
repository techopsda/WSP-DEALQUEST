import { Edit, SimpleForm } from 'react-admin';
import { SupabaseResource } from '../types/SupabaseResource';
import { getEditFieldsForResource } from '../lib/inputs/getEditInputsForResource';
import { AdminRecordActions } from './styling/AdminRecordActions';

interface Props {
  resource: SupabaseResource;
  resources: SupabaseResource[];
}

export const DefaultEdit = ({ resource, resources }: Props) => {
  return (
    <Edit actions={<AdminRecordActions resource={resource} recordViewType="edit" />} mutationMode="optimistic">
      <SimpleForm>{getEditFieldsForResource(resource, resources)}</SimpleForm>
    </Edit>
  );
};
