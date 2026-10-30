import { useGameDetails } from '@/components/hooks/useGameDetails';

import { TooltipComponent } from '@/components/shared/TooltipComponent';
import { Game, Team, Tournament } from '@/types/database';
import { Joyride as ReactJoyride } from 'react-joyride';
import { RoundWrapper } from '../../RoundWrapper';
import { getTooltips } from '@/lib/shared/getTooltips';

interface GamePreviewProps {
  team: Team;
  game: Game;
  tournament: Tournament;
}

export const GamePreview: React.FC<GamePreviewProps> = ({ game, team, tournament }) => {
  const { stageTimings } = useGameDetails();

  const steps = getTooltips(game.periodType, game.year);

  return (
    <RoundWrapper
      tournament={tournament}
      game={game}
      stageTimings={stageTimings}
      team={team}
      header="Introduction"
      subheader="Welcome to DealQuest"
    >
      <div className="flex flex-col gap-16 w-full">
        <ReactJoyride
          run={game.year === 0}
          steps={steps ?? []}
          tooltipComponent={TooltipComponent}

        />
        <div className="flex flex-col items-center">
          <h1 className="font-heading text-5xl text-white" id="stagesPreviewTitle">
            Game Stages
          </h1>
          <p className="text-2xl">Each year is comprised of 7 key stages:</p>
        </div>

        <div className="grid grid-cols-2 gap-12 w-full">
          <div className="flex justify-center">
            <img className="w-full max-w-sm" src="/lobby-illustration.svg" />
          </div>

          <ol className="text-xl [ dq-numbered-list ] flex flex-col justify-center gap-3">
            <li>Round Funding</li>
            <li>Quiz Funding</li>
            <li>Company Analysis and Financing</li>
            <li>Company Auction</li>
            <li>Bull &#38; Bear - Local Event</li>
            <li>Bull &#38; Bear - Global Event</li>
            <li>Accounting</li>
          </ol>
        </div>
      </div>
    </RoundWrapper>
  );
};
