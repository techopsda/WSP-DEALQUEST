import { createModel } from 'schemix';
import PeriodTypeEnum from '../../enums/PeriodType.enum';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';

export default withRelations(
  createModel((PeriodModel) => {
    PeriodModel.mixin(UUIDMixin)
      .int('year')
      .int('periodOrder')
      .int('stage')
      .int('periodLength')
      .enum('type', PeriodTypeEnum)
      .raw('@@schema("public")');
  })
);
