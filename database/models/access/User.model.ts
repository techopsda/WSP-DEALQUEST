import { createModel } from 'schemix';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((UserModel) => {
    UserModel.mixin(UUIDMixin)
      .string('firstName', { optional: true })
      .string('lastName', { optional: true })
      .json('metadata', { optional: true })
      .string('email', { unique: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
