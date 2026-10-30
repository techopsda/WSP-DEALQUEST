import { useGameDetails } from '@/components/hooks/useGameDetails';
import { getTeamMemberString } from '@/lib/team/getTeamMemberString';
import { Game, Member, Team, Tournament } from '@/types/database';
import { RoundWrapper } from '../../RoundWrapper';

interface Props {
  tournament: Tournament;
  game: Game;
  team: Team;
  teamMembers: Member[];
  instructorName: string;
}

export const Welcome: React.FC<Props> = ({ tournament, game, team, teamMembers, instructorName }) => {
  const { stageTimings } = useGameDetails();

  return (
    <RoundWrapper
      tournament={tournament}
      game={game}
      stageTimings={stageTimings}
      team={team}
      header="Introduction"
      subheader="Welcome to DealQuest"
      allowSkip={true}
    >
      <div className="pb-24 flex flex-col items-center gap-9">
        <h1 className="text-white font-heading text-5xl mr-2">Welcome to DealQuest</h1>
        <div className="flex flex-col gap-9 text-xl text-center max-w-4xl">
          <p>
            Congratulations <strong className="text-bravo">{getTeamMemberString(teamMembers)}</strong> for starting{' '}
            <strong className="text-bravo">{team.name}</strong> and taking the first steps towards global success.
          </p>
          <hr className="my-6 max-w-xs w-full mx-auto border-alpha-highlight-dark" />
          <p>
            In this game you will compete with other firms to demonstrate your financial knowledge, analyze and acquire
            the best performing companies at auction, weather global and local economic events and calculate your
            critical end-of-year accounts.
          </p>
          <hr className="my-6 max-w-xs w-full mx-auto border-alpha-highlight-dark" />
          <p className="text-xl">
            The team with the <strong className="text-white">most equity</strong> when the game ends wins.{' '}
            {instructorName} will decide which year the game will end.
          </p>

          <hr className="my-6 max-w-xs w-full mx-auto border-alpha-highlight-dark" />
          <p className="text-xl">
            Good luck!
            <br />
            Remember, it&#39;s just a bit of fun.
          </p>
        </div>
      </div>
    </RoundWrapper>
  );
};
