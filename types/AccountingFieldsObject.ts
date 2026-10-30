import { AccountingField } from './AccountingField';

type AccountingFieldObjectGroup<T extends string> = { [x in T]: AccountingField[] };

export type AccountingFieldsObject = {
  netIncome: AccountingFieldObjectGroup<'incomeBodyFields' | 'incomeFooterFields'>;
  equity: AccountingFieldObjectGroup<'equityBodyFields' | 'equityFooterFields'>;
  cash: AccountingFieldObjectGroup<'cashBodyFields' | 'cashAdditionalFields' | 'cashFooterFields'>;
};
