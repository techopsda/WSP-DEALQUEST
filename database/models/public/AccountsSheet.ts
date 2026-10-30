import { createModel } from 'schemix';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';

export default withRelations(
  createModel((AccountsSheetModel) => {
    AccountsSheetModel.mixin(UUIDMixin)
      .int('year')
      .boolean('netIncome', { optional: true })
      .boolean('equity', { optional: true })
      .boolean('cash', { optional: true })
      .json('accountingInputs', { optional: true })
      .raw('@@schema("public")');
  })
);
