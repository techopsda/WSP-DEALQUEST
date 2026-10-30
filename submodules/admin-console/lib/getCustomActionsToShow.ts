import { Identifier } from 'react-admin';
import { CustomAction } from '../types/Config/CustomAction';

export const getCustomActionsToShow = (customActions: CustomAction[], selectedIds: Identifier[]) => {
  const resourceActions = customActions.filter(
    (customAction) => customAction?.type?.includes('resource') || !customAction?.type
  );
  let recordSpecificActions: CustomAction[] = [];

  if (selectedIds?.length === 1) {
    recordSpecificActions = customActions.filter((customAction) => customAction?.type?.includes('record'));
  } else if (selectedIds?.length > 1) {
    recordSpecificActions = customActions.filter((customAction) => customAction?.type?.includes('bulk'));
  }

  return [...resourceActions, ...recordSpecificActions];
};
