import { useState } from 'react';
import { Datagrid, List, Identifier } from 'react-admin';
import { getListFieldsForResource } from '../lib/fields/getListFieldsForResource';
import { getCustomActionsToShow } from '../lib/getCustomActionsToShow';
import { getFiltersForResource } from '../lib/getFiltersForResource';
import { SupabaseResource } from '../types/SupabaseResource';
import { AdminListActions } from './styling/AdminListActions';

interface Props {
  resource: SupabaseResource;
  resources: SupabaseResource[];
}

export const DefaultList = ({ resource, resources }: Props) => {
  const resourceConfig = resource?.resourceConfig;
  const customActions = resourceConfig?.customActions ?? [];
  const [selectedIds, setSelectedIds] = useState<Identifier[]>([]);

  return (
    <List
      perPage={25}
      empty={false} // TODO - replace with custom component
      filters={getFiltersForResource(resource, resources)}
      actions={
        <AdminListActions
          selectedIds={selectedIds}
          resource={resource}
          customActions={getCustomActionsToShow(customActions, selectedIds)}
        />
      }
      className="relative"
    >
      <Datagrid
        onToggleItem={(id) => {
          if (selectedIds.includes(id)) {
            setSelectedIds([...selectedIds.filter((selectedId) => selectedId !== id)]);
            return;
          }
          setSelectedIds([...selectedIds, id]);
        }}
        selectedIds={selectedIds}
        rowClick="show"
      >
        {getListFieldsForResource(resource)}
      </Datagrid>
    </List>
  );
};
