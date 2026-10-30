import { createEnum } from 'schemix';

export default createEnum((LocalEventTypeEnum) => {
  LocalEventTypeEnum.addValue('positive').addValue('negative').addValue(`@@schema("public")`);
});
