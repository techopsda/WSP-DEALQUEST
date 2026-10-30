import { CustomActionCallbackAlert } from './CustomActionCallbackAlert';

export type ErrorCustomActionCallback = (showAlert: (alert: CustomActionCallbackAlert) => void, error: any) => void;
