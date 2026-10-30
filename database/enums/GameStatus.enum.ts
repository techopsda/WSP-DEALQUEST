import { createEnum } from 'schemix';

export default createEnum((GameStatusEnum) => {
  GameStatusEnum.addValue('notStarted')
    .addValue('active')
    .addValue('finalYear')
    .addValue('waitingForNextYear')
    .addValue('ended')
    .addValue(`@@schema("public")`);
});
