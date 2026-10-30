import _ from 'lodash';
import { useState } from 'react';
import { CreateButton, ExportButton, FilterButton, Identifier } from 'react-admin';
import { CustomAction } from '../../types/Config/CustomAction';
import { SupabaseResource } from '../../types/SupabaseResource';
import { CustomActionComponent } from './CustomActionComponent';

interface AdminListActions {
  resource: SupabaseResource;
  customActions: CustomAction[];
  selectedIds: Identifier[];
}

export const AdminListActions: React.FC<AdminListActions> = ({ selectedIds, customActions, resource }) => {
  const [customActionLoading, setCustomActionLoading] = useState<number>();

  return (
    <div className="flex gap-10 my-6 items-center px-6">
      <span className="absolute left-0 text-3xl">{_.startCase(resource.name ?? 'unknown')}</span>
      {customActions.map((customAction, index) => {
        if (customAction?.useAction) {
          return (
            <CustomActionComponent
              key={index}
              index={index}
              selectedIds={selectedIds}
              customActionLoading={customActionLoading}
              setCustomActionLoading={setCustomActionLoading}
              {...customAction}
            />
          );
        } else if (customAction?.overrideComponent) {
          const OverrideComponent = customAction?.overrideComponent;
          return (
            <OverrideComponent
              key={index}
              index={index}
              selectedIds={selectedIds}
              customActionLoading={customActionLoading}
              setCustomActionLoading={setCustomActionLoading}
              {...customAction}
            />
          );
        }
      })}
      <FilterButton className="flex w-full whitespace-nowrap bg-nsAdmin-600 hover:bg-nsAdmin-700 text-white rounded-md p-2" />
      <ExportButton
        className="flex w-full bg-nsAdmin-600 hover:bg-nsAdmin-700 rounded-md text-white p-2"
        size="medium"
      />
      <CreateButton size="large" />
    </div>
  );
};
