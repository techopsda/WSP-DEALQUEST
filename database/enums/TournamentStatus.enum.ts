import { createEnum } from 'schemix';

export default createEnum((TournamentStatusEnum) => [
  TournamentStatusEnum.addValue('active').addValue('inactive').addValue('paused').addValue(`@@schema("public")`)
]);
