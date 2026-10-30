import { createEnum } from 'schemix';

export default createEnum((GlobalEventTypeEnum) => {
  GlobalEventTypeEnum.addValue('positiveRisk')
    .addValue('negativeRisk')
    .addValue('neutral')
    .addValue('increaseRates')
    .addValue('maxDebtEquity')
    .addValue(`@@schema("public")`);
});
