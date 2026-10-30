import { createModel } from 'schemix';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import QuestionModel from './Question.model';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((AnswerModel) => {
    AnswerModel.mixin(UUIDMixin).string('answer').raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
