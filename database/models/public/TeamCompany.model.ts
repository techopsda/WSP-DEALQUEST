import { createModel } from 'schemix';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((TeamCompanyModel) => {
    TeamCompanyModel.mixin(UUIDMixin)
      .int('yearBought')
      .int('yearSold', { optional: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
