import { createModel } from 'schemix';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((BalanceSheetModel) => {
    BalanceSheetModel.mixin(UUIDMixin)
      .int('year')
      .int('cash')
      .int('equity')
      .int('debt')
      .int('roundFund', { optional: true })
      .int('quizFund', { optional: true })
      .int('financingFund', { optional: true })
      .int('localEventFund', { optional: true })
      .int('globalEventFund', { optional: true })
      .int('auctionSpendings', { optional: true })
      .int('maxDebtFine', { optional: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
