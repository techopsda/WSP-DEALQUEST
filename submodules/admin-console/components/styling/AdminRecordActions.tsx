import { useGetOne } from 'ra-core';
import { useGetRecordId } from 'ra-core';
import { useState } from 'react';
import { EditButton, ListButton, ShowButton } from 'react-admin';
import { SupabaseResource } from '../../types/SupabaseResource';
import { CustomActionComponent } from './CustomActionComponent';

interface AdminRecordActions {
  resource: SupabaseResource;
  recordViewType: 'show' | 'edit';
}

export const AdminRecordActions: React.FC<AdminRecordActions> = ({ resource, recordViewType }) => {
  const recordId = useGetRecordId();
  const { data: record } = useGetOne(resource.name, { id: recordId });
  const [customActionLoading, setCustomActionLoading] = useState<number>();

  const resourceConfig = resource?.resourceConfig;
  const customActions = resourceConfig?.customActions?.filter((customAction) => customAction?.type?.includes('record'));

  return (
    <div className="flex justify-between w-full py-6">
      <span className="text-2xl">
        {`${resource.name} - ${
          (resourceConfig?.getPropertyLabel && resourceConfig.getPropertyLabel(record)) ?? record?.name ?? record?.id
        }`}
      </span>
      <div className="flex gap-10">
        {customActions?.map((customAction, index) => {
          if (customAction?.useAction) {
            return (
              <CustomActionComponent
                key={index}
                index={index}
                selectedIds={[recordId]}
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
                selectedIds={[recordId]}
                customActionLoading={customActionLoading}
                setCustomActionLoading={setCustomActionLoading}
                {...customAction}
              />
            );
          }
        })}
        {recordViewType === 'show' && <EditButton />}
        {recordViewType === 'edit' && <ShowButton />}
        <ListButton />
      </div>
    </div>
  );
};
