'use client';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Team, Game, Notification, TeamWithCompanies, TeamWithBalanceSheetData, Member } from '@/types/database';
import { Tab } from '@headlessui/react';
import { RaceBy } from '@uiball/loaders';
import clsx from 'clsx';
import _ from 'lodash';
import { Bell, Building2, HelpCircle, ListOrdered } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { GameCompanies } from './data/GameCompanies';
import { GameHelp } from './data/GameHelp';
import { GameLeaderboard } from './data/GameLeaderboard';
import { GameNotifications } from './data/GameNotifications';

interface Props {
  team: Team;
  game: Game;
  fetchPrevBalanceSheet: boolean;
  htmlDisplayMode: string;
}
export const GameSidebarTabs: React.FC<Props> = ({ htmlDisplayMode, team, game, fetchPrevBalanceSheet }) => {
  const { supabase } = useSupabase<'public'>();
  const [teamId] = useLocalStorage('teamId', '');
  const [initialNotifications, setInitialNotifications] = useState<Notification[] | undefined>();

  const [teamCompanies, setTeamCompanies] = useState<TeamWithCompanies[]>([]);
  const [teamsWithBalanceSheet, setTeamsWithBalanceSheet] = useState<TeamWithBalanceSheetData[]>([]);
  const [members, setMemebers] = useState<Member[]>();
  const determinedGameYear = game.stage < 9 ? game.year - 1 : game.year;

  useEffect(() => {
    const getMembers = async () => {
      const { data } = await supabase
        .from('Member')
        .select('*')
        .in(
          'teamId',
          _.map(teamsWithBalanceSheet, (team) => team?.teamId)
        );
      setMemebers((data as Member[]) ?? []);
    };
    if (!members || members?.length < 1) getMembers();
  }, [teamsWithBalanceSheet]);

  useEffect(() => {
    const getNotifications = async () => {
      const { data } = await supabase.from('Notification').select('*').or(`teamId.eq.${team.id}, gameId.eq.${game.id}`);
      setInitialNotifications(data as Notification[]);
    };
    getNotifications();
  }, [game]);

  useEffect(() => {
    const getCompanies = async () => {
      const { data } = await supabase.from('TeamCompany').select('*, Company(*)').eq('teamId', teamId);
      setTeamCompanies((data as TeamWithCompanies[]) ?? []);
    };
    getCompanies();
  }, [game]);

  useEffect(() => {
    const getTeamsData = async () => {
      const { data: teamIds } = await supabase.from('Team').select('id').eq('gameId', game.id);
      if (teamIds && (fetchPrevBalanceSheet || game?.periodType === 'yearEnd')) {
        const { data: teamsData } = await supabase
          .from('BalanceSheet')
          .select('*,Team(name)')
          .eq('year', determinedGameYear)
          .in(
            'teamId',
            teamIds.map((team) => team.id)
          );
        setTeamsWithBalanceSheet(teamsData as TeamWithBalanceSheetData[]);
      }
    };
    getTeamsData();
  }, [determinedGameYear]);

  const filteredCompanies = teamCompanies.filter((teamCompany) => {
    return teamCompany.yearSold === null;
  });
  const tabs = [
    {
      name: 'Notifications',
      icon: <Bell className="w-6 h-6" strokeWidth={2} width={24} height={24} />,
      content: (
        <div id="sidebarNotifications">
          {!initialNotifications && (
            <div className="h-full w-full flex items-center justify-center">
              <RaceBy size={200} color="white" />
            </div>
          )}
          {initialNotifications && (
            <GameNotifications
              htmlDisplayMode={htmlDisplayMode}
              game={game}
              teamId={teamId}
              initialNotifications={initialNotifications}
              companies={teamCompanies}
            />
          )}
        </div>
      )
    },
    {
      name: 'Companies',
      icon: <Building2 className="w-6 h-6" strokeWidth={2} width={24} height={24} />,
      content: (
        <GameCompanies
          team={team}
          companies={game.year === 0 && game.periodType === 'auctionPre' ? [] : filteredCompanies}
        />
      )
    },
    {
      name: 'Leaderboard',
      icon: <ListOrdered className="w-6 h-6" strokeWidth={2} width={24} height={24} />,
      content: (
        <>
          {game.year > 0 && (
            <GameLeaderboard
              game={game}
              teamsWithBalanceSheets={teamsWithBalanceSheet}
              currentTeamId={teamId}
              members={members}
            />
          )}
          {game.year < 1 && (
            <div>
              <p>Leaderboard isn't available for practice year</p>
            </div>
          )}
        </>
      )
    },
    {
      name: 'Help',
      icon: <HelpCircle className="w-6 h-6" strokeWidth={2} width={24} height={24} />,
      content: <GameHelp />
    }
  ];
  return (
    <>
      <Tab.Group>
        <Tab.List as="div" id="sidebarTabs" className="flex gap-1.5">
          {tabs.map((tab) => (
            <Tab as={Fragment} key={tab.name}>
              {({ selected }) => (
                <button
                  className={clsx(
                    'px-4 py-3 rounded-t-md text-white',
                    selected ? 'bg-alpha-750' : 'bg-alpha-highlight',
                    'focus:outline-none'
                  )}
                >
                  {tab.icon}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="relative grow w-full bg-alpha-750 rounded-r-lg rounded-bl-lg overflow-hidden">
          {tabs.map((tab) => (
            <Tab.Panel key={tab.name} className="absolute flex flex-col gap-6 h-full w-full overflow-y-auto p-6">
              <>{tab.content}</>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};
