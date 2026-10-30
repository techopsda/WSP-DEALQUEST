import { createModel } from 'schemix';
import LocalEventTypeEnum from '../../enums/LocalEventType.enum';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((LocalEventModel) => {
    LocalEventModel.mixin(UUIDMixin)
      .string('name')
      .string('description')
      .string('output')
      .enum('type', LocalEventTypeEnum)
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
