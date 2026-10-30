import { Game, TeamStatus, Tournament } from '@/types/database';
import _ from 'lodash';
import { useState } from 'react';
import GamePanelButtons from './GamePanelButtons';
import GamePanelHeader from './GamePanelHeader';
import DealQuestModal from '../../shared/DealQuestModal';
import GamePanelTeamData from './GamePanelTeamData';
import { TeamWithDashboardRelations } from '@/types/TournamentWithDashboardRelations';
import { WifiOff } from 'lucide-react';
import clsx from 'clsx';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { readyUpTeam } from '@/lib/team/readyUpTeam';
import { Ring } from '@uiball/loaders';
import { updateTournamentWhenAllGamesEnd } from '../../../app/api/Game/functions/updateTournamentWhenAllGamesEnd';
import { endGame } from '@/lib/game/endGame';

interface IGamePanel {
  expanded: number[];
  handleExpandDisclosure: (index: number) => void;
  index: number;
  game: Game;
  teams: TeamWithDashboardRelations[];
  connectedTeams: string[];
  tournament: Tournament;
}

const GamePanel: React.FC<IGamePanel> = ({
  expanded,
  index,
  handleExpandDisclosure,
  game,
  teams,
  connectedTeams,
  tournament
}) => {
  const [endGameModalOpen, setEndGameModalOpen] = useState(false);
  const [moveGameModalOpen, setMoveGameModalOpen] = useState(false);
  const [moveGameLoading, setMoveGameLoading] = useState(false);
  const { supabase } = useSupabase<'public'>();

  const onGameEnded = async () => {
    try {
      await endGame(game);
      setEndGameModalOpen(false);
    } catch (error) {
      console.error('GamePanel/onGameEnded - FAILED TO END GAME:', error);
    }
  };

  const moveGameToNextPeriod = async () => {
    setMoveGameLoading(true);

    try {
      //getting only teams for current game
      const teamsForGame = teams.filter((team) => team.gameId === game.id);

      //filter out  BalanceSheet TeamCompany and members from team object
      const filteredTeams = _.flatMap(teamsForGame, (team) => _.omit(team, ['BalanceSheet', 'TeamCompany', 'Member']));

      //set teams status to active
      const updatedTeamsWithActiveStatus = _.flatMap(filteredTeams, (team) => {
        return { ...team, status: 'active' as TeamStatus };
      });

      //update all teams status to active
      const { error: ErrorUpdatingTeamStatusToActive } = await supabase.from('Team').upsert(updatedTeamsWithActiveStatus);
      if (ErrorUpdatingTeamStatusToActive) {
        console.log(`Could not update team status to active : ${ErrorUpdatingTeamStatusToActive.message}`);
      }

      const results = await Promise.allSettled(filteredTeams.map((team) => readyUpTeam(game, team?.id)));
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`GamePanel/moveGameToNextPeriod - failed to ready up team ${filteredTeams[index]?.id}:`, result.reason);
        }
      });
    } catch (e) {
      console.error('GamePanel/moveGameToNextPeriod - ERROR:', e);
    } finally {
      //close modal
      setMoveGameLoading(false);
      setMoveGameModalOpen(false);
    }
  };

  return (
    <div
      className={clsx(
        `flex flex-col w-full bg-alpha-light-200 rounded-xl relative border-4`,
        _.uniq(connectedTeams).length !== teams.length ? 'border-error' : 'border-alpha-light-200'
      )}
      key={game.id}
    >
      <DealQuestModal
        isOpen={endGameModalOpen}
        onCancelClicked={() => setEndGameModalOpen(false)}
        onButtonClicked={onGameEnded}
        titleText={`End Game ${index + 1}?`}
        buttonColour="[#B23130]"
        buttonText="I'M SURE END THIS GAME"
      >
        <p>
          This will <strong>end the game</strong> for{' '}
          <strong>
            {teams?.length} {teams?.length === 1 ? 'team' : 'teams'}
          </strong>{' '}
          are you sure?
        </p>
      </DealQuestModal>
      <DealQuestModal
        isOpen={moveGameModalOpen}
        onCancelClicked={() => setMoveGameModalOpen(false)}
        onButtonClicked={moveGameToNextPeriod}
        titleText={`Move Game ${index + 1} To Next Screen`}
        buttonColour="[#B23130]"
        buttonText={!moveGameLoading ? "I'M SURE, MOVE GAME TO NEXT SCREEN!" : <Ring size={20} color="white" />}
      >
        <p>
          Are you sure you want to <strong>move the game to the next screen</strong>, this should only be used when a
          team is stuck on a particular section and all other teams have completed that section.
        </p>
      </DealQuestModal>

      <GamePanelHeader
        game={game}
        teams={teams}
        expanded={expanded}
        handleExpandDisclosure={handleExpandDisclosure}
        index={index}
        tournament={tournament}
      />
      {_.uniq(connectedTeams).length !== teams.length && (
        <WifiOff className="bg-error rounded-full h-12 w-12 text-white p-3 absolute top-0 right-0 -translate-y-1/2 -translate-x-16" />
      )}
      {expanded.includes(index) && (
        <>
          <GamePanelTeamData game={game} teams={teams} connectedTeams={connectedTeams} />
          <GamePanelButtons
            setEndGameModalOpen={setEndGameModalOpen}
            setMoveGameModalOpen={setMoveGameModalOpen}
            status={game?.status}
          />
        </>
      )}
    </div>
  );
};

export default GamePanel;
