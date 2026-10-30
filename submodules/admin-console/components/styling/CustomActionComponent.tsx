import { useNotify, useRefresh } from 'react-admin';
import { handleCustomActionClick } from '../../lib/handleCustomActionClick';
import { CustomActionButtonDetailsProps } from '../../types/Config/CustomActionButtonDetails';
import { CustomActionFunction } from '../../types/Config/CustomActionFunction';
import { CustomActionProps } from '../../types/Config/CustomActionProps';
import { CustomActionButton } from './CustomActionButton';
import { CustomActionButtonDetails } from './CustomActionButtonDetails';

type CustomActionComponentProps = CustomActionProps & {
  useAction: CustomActionFunction;
  buttonDetails: CustomActionButtonDetailsProps;
};

export const CustomActionComponent: React.FC<CustomActionComponentProps> = ({
  useAction,
  setCustomActionLoading,
  successCallback,
  errorCallback,
  selectedIds,
  index,
  customActionLoading,
  buttonDetails
}) => {
  const action = useAction(selectedIds);
  const refresh = useRefresh();
  const notify = useNotify();

  const handleClick = async () => {
    setCustomActionLoading(index);
    await handleCustomActionClick(action, notify, successCallback, errorCallback);
    setCustomActionLoading(undefined);

    refresh();
  };

  return (
    <CustomActionButton label={buttonDetails?.label} onClick={handleClick}>
      <CustomActionButtonDetails {...buttonDetails} isLoading={index === customActionLoading} />
    </CustomActionButton>
  );
};
