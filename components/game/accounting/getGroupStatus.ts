import { AccountingField } from '@/types/AccountingField';
import { Game } from '@/types/database';

export const getGroupStatus = (
  groupedCorrectFields: _.Dictionary<(AccountingField & { group: string })[]>,
  allFieldsWithGroup: (AccountingField & { group: string })[],
  game: Game,
  group: string
) => {
  return (
    groupedCorrectFields?.[group]?.filter((field) => !field.practiceOnly || game.year === 0).length ===
    allFieldsWithGroup.filter(
      (fieldGroup) => fieldGroup.group === group && (!fieldGroup.practiceOnly || game.year === 0)
    )?.length
  );
};
