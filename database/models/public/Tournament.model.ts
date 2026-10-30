import { createModel } from 'schemix';
import TournamentStatusEnum from '../../enums/TournamentStatus.enum';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((TournamentModel) => {
    TournamentModel.mixin(UUIDMixin)
      .string('lobbyCode')
      .int('finalYear', { optional: true, default: 6 })
      .boolean('practiceRound')
      .enum('status', TournamentStatusEnum, { default: 'active' })
      .string('instructorName', { optional: true })
      .raw(`@@schema("${SCHEMA_NAME}")`)
      .raw('@@index([lobbyCode])');
  })
);
