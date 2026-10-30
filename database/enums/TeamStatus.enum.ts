import { createEnum } from 'schemix';

export default createEnum((TeamStatusEnum) => {
  TeamStatusEnum.addValue('awaitingTeamName')
    .addValue('awaitingTeamMembers')
    .addValue('awaitingRegistrationCode')
    .addValue('active')
    .addValue('awaitingNextPeriod')
    .addValue(`@@schema("public")`);
});
