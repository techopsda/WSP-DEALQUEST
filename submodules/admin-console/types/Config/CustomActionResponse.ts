import { NotificationType } from 'react-admin';

export type CustomActionResponse = {
  message: string;
  type: NotificationType | undefined;
};
