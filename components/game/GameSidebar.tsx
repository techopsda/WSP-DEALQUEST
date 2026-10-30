'use client';

import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { BalanceSheet, Game, Team } from '@/types/database';
import clsx from 'clsx';
import { Crown } from 'lucide-react';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import LogoGroup from '../lobby/LogoGroup';
import { Counter } from './Counter';
import { GameSidebarTabs } from './GameSidebarTabs';

interface Props {
  game: Game;
  team: Team;
  isOpen: boolean;
  setSidebarAnimationEnded?: (animationEnded: boolean) => void;
  fetchPrevBalanceSheet: boolean;
}

const slideAnimationDurationMillis = 300;

export const GameSidebar: React.FC<Props> = ({
  game,
  team,
  isOpen,
  setSidebarAnimationEnded,
  fetchPrevBalanceSheet
}) => {
  // if !isOpen then wait for "animation duration" then add display:none
  // if isOpen then immediately set display:block

  const { supabase } = useSupabase<'public'>();
  const [teamId] = useLocalStorage('teamId', '');
  const [teamBalanceSheet, setTeamBalanceSheet] = useState<BalanceSheet>();

  const [htmlDisplayMode, setHtmlDisplayMode] = useState(isOpen ? 'block' : 'hidden');

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setHtmlDisplayMode('hidden');
      }, slideAnimationDurationMillis);
      setTimeout(() => {
        setSidebarAnimationEnded && setSidebarAnimationEnded(true);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      setHtmlDisplayMode('block');
    }
  }, [isOpen]);

  useEffect(() => {
    const getTeamValues = async () => {
      if (fetchPrevBalanceSheet || game.periodType === 'yearEnd') {
        const { data, error } = await supabase
          .from('BalanceSheet')
          .select('*')
          .eq('teamId', teamId)
          .eq('year', game.periodType !== 'yearEnd' ? game.year - 1 : game.year)
          .single();
        setTeamBalanceSheet(data as BalanceSheet);
        if (error) console.log(error.message);
      }
    };
    getTeamValues();
  }, [game.periodType === 'yearEnd']);

  const cashBalance = teamBalanceSheet?.cash ?? 0;
  const [cashValueFrom, setCashValueFrom] = useState(cashBalance);
  const [cashValueTo, setCashValueTo] = useState(cashBalance);

  const debtBalance = teamBalanceSheet?.debt ?? 0;
  const [debtValueFrom, setDebtValueFrom] = useState(debtBalance);
  const [debtValueTo, setDebtValueTo] = useState(debtBalance);

  const equityBalance = teamBalanceSheet?.equity ?? 0;
  const [equityValueFrom, setEquityValueFrom] = useState(equityBalance);
  const [equityValueTo, setEquityValueTo] = useState(equityBalance);

  useEffect(() => {
    setCashValueFrom(cashValueTo);
    setCashValueTo(cashBalance);
  }, [cashBalance]);

  useEffect(() => {
    setDebtValueFrom(debtValueTo);
    setDebtValueTo(debtBalance);
  }, [debtBalance]);

  useEffect(() => {
    setEquityValueFrom(equityValueTo);
    setEquityValueTo(equityBalance);
  }, [equityBalance]);

  return (
    <aside
      id={'sidebar'}
      className={clsx(
        `shrink-0 bg-alpha max-w-[26rem] shadow-xl flex flex-col duration-300`,
        htmlDisplayMode,
        !isOpen ? 'w-0 min-w-0' : 'w-full min-w-[20rem]'
      )}
    >
      <section id="sidebarFinancialStats" className="shrink-0 bg-alpha-800 px-6 py-9 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-start text-bravo">
            <Crown className="shrink-0 h-6 w-6 translate-y-1.5" />
            <p className={`text-2xl font-medium`}>{team.name}</p>
          </div>
          <div className="flex flex-col gap-1">
            {game.periodType === 'yearEnd' ? (
              <p className="text-lg font-medium text-white">
                Your financials at the end of {game.year !== 0 ? `year ${game.year}` : `Practice year`}
              </p>
            ) : (
              <p className="text-lg font-medium text-white">Your financials as of the introduction</p>
            )}

            <p>These values are not real-time, you need to update these at the end of each round.</p>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
          <div className="flex items-end gap-3">
            <dt>Cash:</dt>
            <dd className="text-lg font-semibold text-white">
              $
              {game.periodType === 'yearEnd' ? (
                <Counter from={cashValueFrom} to={cashValueTo} />
              ) : (
                teamBalanceSheet?.cash ?? 0
              )}
              m{' '}
            </dd>
          </div>
          <div className="flex items-end gap-3">
            <dt>Debt:</dt>
            <dd className="text-lg font-semibold text-white">
              $
              {game.periodType === 'yearEnd' ? (
                <Counter from={debtValueFrom} to={debtValueTo} />
              ) : (
                teamBalanceSheet?.debt ?? 0
              )}
              m{' '}
            </dd>
          </div>
          <div className="flex items-end gap-3">
            <dt>Equity:</dt>
            <dd className="text-lg font-semibold text-white">
              $
              {game.periodType === 'yearEnd' ? (
                <Counter from={equityValueFrom} to={equityValueTo} />
              ) : (
                teamBalanceSheet?.equity ?? 0
              )}
              m{' '}
            </dd>
          </div>
        </dl>
      </section>

      <section className="grow px-6 pt-6 flex flex-col">
        <GameSidebarTabs
          htmlDisplayMode={htmlDisplayMode}
          fetchPrevBalanceSheet={fetchPrevBalanceSheet}
          team={team}
          game={game}
        />
      </section>

      <div className="shrink-0 p-6">
        <LogoGroup align="items-end" feHeight="max-h-3.5" dqHeight="max-h-6" gap="gap-2" />
      </div>
    </aside>
  );
};
