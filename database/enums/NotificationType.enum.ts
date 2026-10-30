import { createEnum } from 'schemix';

export default createEnum((NotificationsTypeEnum) => {
  NotificationsTypeEnum.addValue('endOfYearType')
    .addValue('equityInvestmentType')
    .addValue('quizFundingType')
    .addValue('financingType')
    .addValue('auctionType')
    .addValue('localEventType')
    .addValue('globalEventType')
    .addValue('accountingType')
    .addValue('endOfYearEarnings')
    .addValue('maxDebtFine')
    .addValue(`@@schema("public")`);
});
