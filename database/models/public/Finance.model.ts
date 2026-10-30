import { createModel } from 'schemix';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((FinanceModel) => {
    FinanceModel.mixin(UUIDMixin)
      .int('year')
      .int('amountDebtPaid', { optional: true })
      .int('amountIncomeSale', { optional: true })
      .int('amountBorrowed', { optional: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
