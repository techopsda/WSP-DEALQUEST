import { createEnum } from 'schemix';

export default createEnum((QuestionTypeEnum) => {
  QuestionTypeEnum.addValue('simple').addValue('tabular').addValue(`@@schema("public")`);
});
