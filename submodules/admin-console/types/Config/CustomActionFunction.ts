import { Identifier } from 'react-admin';
import { CustomActionResponse } from './CustomActionResponse';

export type CustomActionFunction = (
  selectedIds: Identifier[]
) => () => Promise<CustomActionResponse> | Promise<void> | CustomActionResponse | void;
