import { CustomActionCore } from './CustomActionCore';
import { CustomActionProps } from './CustomActionProps';

export type CustomAction = Omit<
  CustomActionProps,
  'index' | 'selectedIds' | 'customActionLoading' | 'setCustomActionLoading' | 'buttonDetails'
> &
  CustomActionCore;
