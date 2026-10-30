import { createModel } from 'schemix';
import QuestionTypeEnum from '../../enums/QuestionType.enum';
import UUIDMixin from '../../mixins/UUID.mixin';
import { withRelations } from '../../relations/util/withRelations';
import AnswerModel from './Answer.model';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((QuestionModel) => {
    QuestionModel.mixin(UUIDMixin)
      .string('name')
      .enum('type', QuestionTypeEnum, { default: 'simple' })
      .json('metadata', { optional: true })
      .int('year')
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
