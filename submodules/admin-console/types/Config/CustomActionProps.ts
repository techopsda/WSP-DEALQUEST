import { Identifier } from 'react-admin';
import { CustomActionButtonDetailsProps } from './CustomActionButtonDetails';
import { ErrorCustomActionCallback } from './ErrorCustomActionCallback';
import { SuccessCustomActionCallback } from './SuccessCustomActionCallback';

export type CustomActionProps = {
  index: number;
  selectedIds: Identifier[];
  customActionLoading?: number;
  setCustomActionLoading: (customActionLoading?: number) => void;
  type?: ('bulk' | 'record' | 'resource')[];
  successCallback?: SuccessCustomActionCallback;
  errorCallback?: ErrorCustomActionCallback;
  buttonDetails?: CustomActionButtonDetailsProps;
};
