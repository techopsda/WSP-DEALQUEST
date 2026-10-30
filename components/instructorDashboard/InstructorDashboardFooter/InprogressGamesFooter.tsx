import { Game, Tournament } from '@/types/database';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dices } from 'lucide-react';
import { Fragment } from 'react';

interface InprogressGamesFooterProps {
  games: Game[];
  tournament: Tournament;
}

function dieSplit(num: number) {
  const rolls: number[] = [];
  while (num > 0) {
    const roll = Math.min(num, 6);
    rolls.push(roll);
    num -= roll;
  }
  return rolls;
}

const InprogressGamesFooter: React.FC<InprogressGamesFooterProps> = ({ games, tournament }) => {
  const gamesInProgress = games.filter((game) => game.status === 'active' || game.status === 'finalYear');
  return (
    <div className="flex justify-between pl-6 bg-alpha-700 items-center">
      {gamesInProgress.length > 0 && (
        <span>
          Games in progress - {gamesInProgress[0]?.year === 0 ? 'Practice Year' : 'Year ' + gamesInProgress[0].year}
        </span>
      )}
      {gamesInProgress.length === 0 && <span>No games in progress</span>}

      <div className="flex bg-alpha-800 h-full p-6 items-center gap-6">
        <div className="flex gap-3 font-semibold items-center h-full">
          <Dices className="h-6 w-6 text-bravo" strokeWidth={2} />
          {tournament.lobbyCode}
        </div>
        {gamesInProgress.map((game, i) => {
          let die = dieSplit(i + 1);

          return (
            <div className="flex gap-3 font-semibold items-center h-full" key={game.id}>
              <div className="flex item-center gap-1">
                {die.map((die, ii) => (
                  <Fragment key={i + '-' + ii}>
                    {die === 1 ? (
                      <Dice1 className="h-6 w-6 text-bravo" strokeWidth={2} />
                    ) : die === 2 ? (
                      <Dice2 className="h-6 w-6 text-bravo" strokeWidth={2} />
                    ) : die === 3 ? (
                      <Dice3 className="h-6 w-6 text-bravo" strokeWidth={2} />
                    ) : die === 4 ? (
                      <Dice4 className="h-6 w-6 text-bravo" strokeWidth={2} />
                    ) : die === 5 ? (
                      <Dice5 className="h-6 w-6 text-bravo" strokeWidth={2} />
                    ) : (
                      <Dice6 className="h-6 w-6 text-bravo" strokeWidth={2} />
                    )}
                  </Fragment>
                ))}
              </div>
              {game?.year}
              {String.fromCharCode(game?.stage + 97).toUpperCase()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InprogressGamesFooter;
