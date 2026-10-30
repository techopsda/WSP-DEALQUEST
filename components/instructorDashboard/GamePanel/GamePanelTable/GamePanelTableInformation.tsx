import { useSettings } from '@/submodules/supabase-functions/lib/settings/useSettings';
import { Game, Tournament } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import { TeamWithDashboardRelations } from '@/types/TournamentWithDashboardRelations';
import { globalEventsData } from '../../../../database/seed/data/public/EventsData/globalEventsData';

interface IGameTableInformation {
  teams: TeamWithDashboardRelations[];
  game: Game;
  tournament: Tournament;
}

const GamePanelTableInformation: React.FC<IGameTableInformation> = ({ teams, game, tournament }) => {
  //TODO: Change 'Stage: ${stageNumber}' to show Round: ${roundLetter} - ${roundName} when a way of determening round names is implemented
  // Updated by Ste - Should only need to append the name of the round now

  const { getSettings } = useSettings<GameSettings>();
  const { interestRate } = getSettings(['interestRate']);

  const currentGlobalEvent = globalEventsData(interestRate?.rate).find(
    (globalEvent) => globalEvent?.orderNo === (tournament?.practiceRound ? game?.year + 1 : game?.year)
  );

  return (
    <div className="flex items-center justify-between gap-6 w-full">
      <div className="flex gap-5">
        <p className="text-alpha-100">
          Stage:&nbsp;
          <span className="font-semibold text-alpha-400">{String.fromCharCode(game?.stage + 97).toUpperCase()}</span>
        </p>
        {game.periodType === 'globalEvent' && (
          <p className="text-alpha-100">
            Global Event:&nbsp;
            <span className="font-semibold text-alpha-400">{currentGlobalEvent?.name ?? ''}</span>
          </p>
        )}
      </div>
      <p className="text-alpha-100">
        Teams:&nbsp;<span className="font-semibold text-alpha-300">{teams.length}</span>
      </p>
    </div>
  );
};

export default GamePanelTableInformation;
