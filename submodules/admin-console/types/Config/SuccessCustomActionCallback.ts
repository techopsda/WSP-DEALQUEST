import { CustomActionCallbackAlert } from './CustomActionCallbackAlert';

export type SuccessCustomActionCallback = (showAlert: (alert: CustomActionCallbackAlert) => void) => void;
