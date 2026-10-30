import { createModel } from 'schemix';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';
import GlobalEventType from '../../enums/GlobalEventType.enum';

export default withRelations(
  createModel((GlobalEventModel) => {
    GlobalEventModel.mixin(UUIDMixin)
      .string('name')
      .string('description')
      .int('orderNo')
      .enum('type', GlobalEventType)
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
