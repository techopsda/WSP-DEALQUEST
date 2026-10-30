import { RelationStyle } from '../types/Config/RelationStyle';

export const getDefaultRelationStyle = (screen: string): RelationStyle => {
  if (screen === 'list') return RelationStyle.Chip;
  if (screen === 'show') return RelationStyle.DataGrid;
  if (screen === 'edit') return RelationStyle.DataGrid;
  return RelationStyle.Chip;
};
