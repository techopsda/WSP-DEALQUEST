'use client';

import useIsInstructor from '@/components/hooks/useInstructor';
import DealQuestModal from '@/components/shared/DealQuestModal';
import { createGamesFromTeamSplit } from '@/lib/team/createGamesFromTeamSplit';
import { splitArrayIntoEvenChunks } from '@/lib/team/splitArrayIntoEvenChunks';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useSettings } from '@/submodules/supabase-functions/lib/settings/useSettings';
import { Team, Tournament } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import _ from 'lodash';
import { useState } from 'react';
import { Message } from './Message';
import { TeamsInfo } from './TeamsInfo';

interface Props {
  teams: Team[];
  tournament: Tournament;
}

export const LobbyFooter: React.FC<Props> = ({ teams, tournament }) => {
  const isInstructor = useIsInstructor();
  const totalTeams = teams.length;
  const readyTeams = teams.filter((team) => team.status === 'active').length;
  const readyTeamsArray = teams.filter((team) => team.status === 'active');
  const unreadyTeams = totalTeams - readyTeams;
  const allTeamsReady = readyTeams === totalTeams && totalTeams > 0;
  const [splitTeamsModalOpen, setSplitTeamsModalOpen] = useState(false);

  const { getSetting } = useSettings<GameSettings>();
  const maxTeamsPerGame = getSetting('maxTeamsPerGame');

  const splitTeams = splitArrayIntoEvenChunks(_.map(readyTeamsArray, 'id'), maxTeamsPerGame?.amount ?? 10);
  const { supabase } = useSupabase<'public'>();

  const handleSplitTeams = () => {
    createGamesFromTeamSplit(splitTeams, teams, tournament, supabase);
    setSplitTeamsModalOpen(false);
  };

  return (
    <footer className="p-6 bg-alpha-800 fixed bottom-0 left-0 w-full">
      <DealQuestModal
        isOpen={splitTeamsModalOpen}
        onCancelClicked={() => setSplitTeamsModalOpen(false)}
        onButtonClicked={handleSplitTeams}
        titleText={
          splitTeams?.length > 1
            ? `Split ${readyTeams} ${readyTeams === 1 ? 'team' : 'teams'} into games?`
            : `Add ${readyTeams} ${readyTeams === 1 ? 'team' : 'teams'} to a game?`
        }
        buttonColour="success"
        buttonText={splitTeams?.length > 1 ? 'Create games' : 'Create game'}
      >
        {unreadyTeams > 0 && (
          <span>
            This will{' '}
            <strong className="text-white">
              delete {unreadyTeams} {unreadyTeams === 1 ? 'team' : 'teams'}
            </strong>{' '}
            are you sure?
          </span>
        )}
        <span>
          This action is <strong className="text-white">irreversible</strong>
        </span>
      </DealQuestModal>
      <div className="flex justify-between items-center">
        <Message allTeamsReady={allTeamsReady} />
        {isInstructor && (
          <TeamsInfo
            splitTeams={splitTeams}
            totalTeams={totalTeams}
            readyTeams={readyTeams}
            handleSplitTeams={() => setSplitTeamsModalOpen(true)}
          />
        )}
      </div>
    </footer>
  );
};
