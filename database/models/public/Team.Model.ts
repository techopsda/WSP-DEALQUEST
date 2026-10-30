import { createModel } from 'schemix';
import TeamStatusEnum from '../../enums/TeamStatus.enum';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((TeamModel) => {
    TeamModel.mixin(UUIDMixin)
      .string('name', { optional: true })
      .enum('status', TeamStatusEnum)
      .int('gameRating', { optional: true })
      .string('registrationNumber', { optional: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
