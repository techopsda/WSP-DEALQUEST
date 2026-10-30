import { createModel } from 'schemix';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((BidModel) => {
    BidModel.mixin(UUIDMixin).int('amount').raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
