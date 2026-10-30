import { createModel } from 'schemix';
import GameStatusEnum from '../../enums/GameStatus.enum';
import PeriodTypeEnum from '../../enums/PeriodType.enum';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((GameModel) => {
    GameModel.mixin(UUIDMixin)
      .int('year')
      .int('stage')
      .int('period', { default: 0 })
      .enum('periodType', PeriodTypeEnum, { default: 'welcome' })
      .enum('status', GameStatusEnum, { default: 'notStarted' })
      .dateTime('stageStartTime', { optional: true })
      .dateTime('stageEndTime', { optional: true })
      .dateTime('stagePausedTime', { optional: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
