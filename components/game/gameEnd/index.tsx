import LogoGroup from '@/components/lobby/LogoGroup';
import Leaderboard from '@/components/shared/Leaderboard';
import { Game, Team, TeamsForFinalLeaderboard, Tournament } from '@/types/database';
import { StarInput } from './StarInput';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useBalanceSheetAndCompanies } from '../yearEnd/useBalanceSheetAndCompanies';
import _ from 'lodash';
import useLocalStorage from '@/components/hooks/useLocalStorage';
import { GameEndPodium } from './GameEndPodium';
import { Loading } from '@/components/shared/Loading';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { getBalanceSheetYear } from '../shared/getBalanceSheetYear';
import { ConfettiBurst } from './ConfettiBurst';

interface GameEndProps {
  game: Game;
  tournament: Tournament;
}

export const GameEnd: React.FC<GameEndProps> = ({ game, tournament }) => {
  const { supabase } = useSupabase<'public'>('public');
  const [isExploding, setIsExploding] = useState(false);

  const { fetchPrevBalanceSheet } = getBalanceSheetYear(game?.year, tournament?.practiceRound);
  const { teamBalanceSheets, isLoading } = useBalanceSheetAndCompanies(game, fetchPrevBalanceSheet);

  const [winners, setWinners] = useState<TeamsForFinalLeaderboard>();
  const [showFirstPlacedTeam, setShowFirstPlacedTeam] = useState<boolean>(false);
  const [showSecondPlacedTeam, setShowSecondPlacedTeam] = useState<boolean>(false);
  const [showThirdPlacedTeam, setShowThirdPlacedTeam] = useState<boolean>(false);
  const [teamId] = useLocalStorage('teamId', '');
  const [isdraw, setIsDraw] = useState<boolean>(false);
  const [isLeavingGame, setIsLeavingGame] = useState<boolean>(false);
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState(0);

  const groupedTeamBalanceSheets = _.groupBy(
    teamBalanceSheets.map((teamBalanceSheet) => {
      return { ...teamBalanceSheet };
    }),
    'equity'
  );
  useEffect(() => {
    const getWinners = () => {
      const orderedKeys = _.orderBy(Object.keys(groupedTeamBalanceSheets), (item) => parseInt(item), 'desc').slice(
        0,
        3
      );
      const winningBoard = {
        third: groupedTeamBalanceSheets[orderedKeys[2]],
        second: groupedTeamBalanceSheets[orderedKeys[1]],
        first: groupedTeamBalanceSheets[orderedKeys[0]]
      };

      setWinners(winningBoard);
    };
    getWinners();
  }, [teamBalanceSheets]);

  useEffect(() => {
    setTimeout(() => {
      setShowThirdPlacedTeam(true);
      setShowSecondPlacedTeam(true);
      setShowFirstPlacedTeam(true);
    }, 1500);
  });

  useEffect(() => {
    // Set true when the 1st place animates in
    setTimeout(() => {
      setIsExploding(true);
    }, 4000);

    // Set to false when the confetti animation has finished
    setTimeout(() => {
      setIsExploding(false);
    }, 8000); // extra second added to make sure the animation has finished before removing it from the DOM
  }, []);

  useEffect(() => {
    if (winners) {
      const draw = winners.first?.length > 1 || winners.second?.length > 1 || winners.third?.length > 1;
      setIsDraw(draw);
    }
  }, [winners]);

  const leaveGame = async () => {
    setIsLeavingGame(true);
    if (selectedRating > 0) {
      const { data: updateTeamRating, error: errorUpdatingTeamRating } = await supabase
        .from('Team')
        .update({ gameRating: selectedRating })
        .eq('id', teamId)
        .single();
      if (errorUpdatingTeamRating) {
        console.log('Could not update team rating: ', errorUpdatingTeamRating.message);
      }
    }
    localStorage.clear();
    setIsLeavingGame(false);
    router.push(`${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}`);
  };
  return (
    <>
      {!isLeavingGame ? (
        <>
          {isExploding && (
            <div className="absolute w-0 -top-24 left-1/2">
              <ConfettiBurst />
            </div>
          )}
          <div className="w-full flex flex-col items-center gap-28 py-12">
            <LogoGroup feHeight="max-h-6" dqHeight="max-h-12" gap="gap-6" />
            {!isLoading && !isdraw && winners && (
              <GameEndPodium
                winners={winners}
                teamId={teamId}
                showFirstPlacedTeam={showFirstPlacedTeam}
                showSecondPlacedTeam={showSecondPlacedTeam}
                showThirdPlacedTeam={showThirdPlacedTeam}
              />
            )}
            <motion.div
              className="w-full flex flex-col items-center gap-16"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 4 }}
            >
              <Leaderboard
                teamBalanceSheets={teamBalanceSheets}
                title="Final Leaderboard"
                titleSize="text-5xl"
                teamId={teamId}
              />
              <div className="py-24 flex flex-col items-center gap-12">
                <p className="text-2xl">The game is over, we hope you enjoyed it!</p>
                <div className="flex flex-col items-center gap-3">
                  <p className="text-xl">How would you rate the game?</p>
                  <StarInput id="game-rating" setSelectedRating={setSelectedRating} />
                </div>
                <div className="text-center">
                  <button className="[ dqButton ]" onClick={leaveGame}>
                    Leave game
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
