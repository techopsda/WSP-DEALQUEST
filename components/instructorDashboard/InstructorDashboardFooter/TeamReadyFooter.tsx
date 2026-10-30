import { Game } from '@/types/database';

interface ITeamReadyFooter {
  games: Game[];
  allReadyGames: number;
  allGamesInProgress: number;
  handleStartNextYear: () => void;
}

const TeamReadyFooter: React.FC<ITeamReadyFooter> = ({
  games,
  allReadyGames,
  allGamesInProgress,
  handleStartNextYear
}) => {
  const disable = games.some((game) => game.status !== 'waitingForNextYear');

  return (
    <div className="flex justify-end p-6 w-full" key={games[0]?.id}>
      <div className="flex gap-6">
        <p className="flex items-center text-xl font-semibold">
          {allReadyGames < 1 ? (
            <span>
              Games in progress: {allGamesInProgress}/{games.length}
            </span>
          ) : (
            <span>
              {' '}
              Games ready: {allReadyGames}/{games.length}
            </span>
          )}
        </p>
        <button className="[ dqButton ]" disabled={disable} onClick={handleStartNextYear}>
          Start The Next Year
        </button>
      </div>
    </div>
  );
};

export default TeamReadyFooter;
