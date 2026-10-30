import { Show, SimpleShowLayout } from 'react-admin';
import { getShowFieldsForResource } from '../lib/fields/getShowFieldsForResource';
import { SupabaseResource } from '../types/SupabaseResource';
import { AdminRecordActions } from './styling/AdminRecordActions';

interface Props {
  resource: SupabaseResource;
}

export const DefaultShow = ({ resource }: Props) => {
  return (
    <Show className="overflow-y-auto" actions={<AdminRecordActions resource={resource} recordViewType="show" />}>
      <SimpleShowLayout>{getShowFieldsForResource(resource)}</SimpleShowLayout>
    </Show>
  );
};
