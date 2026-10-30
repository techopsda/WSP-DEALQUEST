import { createEnum } from 'schemix';
import { periods } from '../../app/api/Game/periods';

export default createEnum((PeriodTypeEnum) => {
  periods.forEach((period) => {
    PeriodTypeEnum.addValue(period.type);
  });
  PeriodTypeEnum.addValue('@@schema("public")');
});
