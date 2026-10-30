import { TeamCard } from '@/components/lobby/TeamCard';
import { TeamsForFinalLeaderboard } from '@/types/database';
import { Medal, Trophy } from 'lucide-react';
import { TeamWithBalanceSheetDataAndMembers } from '../yearEnd/useBalanceSheetAndCompanies';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GameEndProdiumProps {
  winners: TeamsForFinalLeaderboard;
  teamId: string;
  showThirdPlacedTeam: boolean;
  showFirstPlacedTeam: boolean;
  showSecondPlacedTeam: boolean;
}

export const GameEndPodium: React.FC<GameEndProdiumProps> = ({
  winners,
  teamId,
  showThirdPlacedTeam,
  showFirstPlacedTeam,
  showSecondPlacedTeam
}) => {
  return (
    <div className="w-full grid grid-cols-3 gap-20 max-w-7xl mt-24">
      <div className="flex flex-col gap-6 text-bronze">
        {winners && showThirdPlacedTeam && (
          <>
            {winners?.third?.map((thirdPlaced: TeamWithBalanceSheetDataAndMembers) => (
              <div key={thirdPlaced.Team.id}>
                <motion.div
                  initial={{ opacity: 0, y: -24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <TeamCard
                    isUser={thirdPlaced.Team.id === teamId}
                    team={thirdPlaced.Team}
                    borderColor="border-bronze"
                    textColor="text-bronze"
                    teamMembers={thirdPlaced?.Team?.Member}
                  />
                </motion.div>
              </div>
            ))}
          </>
        )}
        <p
          className={clsx([
            'flex items-center justify-center gap-3',
            (!showThirdPlacedTeam || !winners?.third) && 'hidden'
          ])}
        >
          <Medal className="w-6 h-6" strokeWidth={1} />
          3rd Place
        </p>
      </div>

      <div className="flex flex-col gap-6 text-gold -translate-y-12">
        {winners && showFirstPlacedTeam && (
          <>
            {winners?.first?.map((firstPlaced: TeamWithBalanceSheetDataAndMembers) => (
              <div key={firstPlaced.Team.id}>
                <div className="scale-[1.1]">
                  <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 2 }}
                  >
                    <TeamCard
                      isUser={firstPlaced.Team.id === teamId}
                      team={firstPlaced.Team}
                      borderColor="border-gold"
                      textColor="text-gold"
                      teamMembers={firstPlaced?.Team?.Member}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </>
        )}
        <p
          className={clsx([
            'flex items-center justify-center gap-3',
            (!showFirstPlacedTeam || !winners?.first) && 'hidden'
          ])}
        >
          <Trophy className="w-6 h-6" strokeWidth={1} />
          1st Place
        </p>
      </div>

      <div className="flex flex-col gap-6 text-silver">
        {winners && showSecondPlacedTeam && (
          <>
            {winners?.second?.map((secondPlaced: TeamWithBalanceSheetDataAndMembers) => (
              <div key={secondPlaced.Team.id}>
                <motion.div
                  initial={{ opacity: 0, y: -24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <TeamCard
                    isUser={secondPlaced.Team.id === teamId}
                    team={secondPlaced.Team}
                    borderColor="border-silver"
                    textColor="text-silver"
                    teamMembers={secondPlaced?.Team?.Member}
                  />
                </motion.div>
              </div>
            ))}
          </>
        )}
        <p
          className={clsx([
            'flex items-center justify-center gap-3',
            (!showSecondPlacedTeam || !winners?.second) && 'hidden'
          ])}
        >
          <Medal className="w-6 h-6" strokeWidth={1} />
          2nd Place
        </p>
      </div>
    </div>
  );
};
