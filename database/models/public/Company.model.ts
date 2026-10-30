import { createModel } from 'schemix';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((CompanyModel) => {
    CompanyModel.mixin(UUIDMixin)
      .string('name')
      .int('reserve')
      .int('risk')
      .int('year')
      .int('salePrice')
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
