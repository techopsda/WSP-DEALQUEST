import { CustomActionResponse } from '../types/Config/CustomActionResponse';
import { ErrorCustomActionCallback } from '../types/Config/ErrorCustomActionCallback';
import { SuccessCustomActionCallback } from '../types/Config/SuccessCustomActionCallback';
import { NotificationType } from 'ra-core';

export const handleCustomActionClick = async (
  action: () => Promise<void> | Promise<CustomActionResponse> | void | CustomActionResponse,
  notify: (message: string, options?: { type: NotificationType }) => void,
  successCallback?: SuccessCustomActionCallback,
  errorCallback?: ErrorCustomActionCallback
) => {
  try {
    const response = await action();

    if (successCallback) {
      successCallback((alert) => {
        notify(`${alert?.message}${alert?.status ? ` - Status Code: ${alert?.status}` : ''}`, {
          type: alert?.type
        });
      });
    } else if (!successCallback && response) {
      notify(response.message, { type: response.type ?? 'success' });
    } else {
      notify('Operation Successful', { type: 'success' });
    }
  } catch (error) {
    if (errorCallback) {
      errorCallback((alert) => {
        notify(`${alert?.message}${alert?.status ? ` - Status Code: ${alert?.status}` : ''}`, {
          type: alert?.type
        });
      }, error);
    } else if (error) {
      const typedError = error as CustomActionResponse;
      notify(typedError.message, { type: typedError?.type ?? 'error' });
    } else {
      notify('Operation Failed', { type: 'error' });
    }
  }
};
