import { createModel } from 'schemix';
import NotificationTypeEnum from '../../enums/NotificationType.enum';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((NotificationModel) => {
    NotificationModel.mixin(UUIDMixin)
      .int('year')
      .int('stage')
      .json('message')
      .enum('type', NotificationTypeEnum)
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
