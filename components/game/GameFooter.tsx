'use client';

import { readyUpTeam } from '@/lib/team/readyUpTeam';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { BalanceSheet, Game, Team } from '@/types/database';
import { StageTimings } from '@/types/StageTimings';
import { Ring } from '@uiball/loaders';
import clsx from 'clsx';
import { differenceInMilliseconds } from 'date-fns';
import { Crown, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import useInterval from '../../database/hooks/useInterval';
import CountdownBar from '../shared/CountdownBar';
import { Counter } from './Counter';
import { CountdownTimer } from './shared/CountdownTimer';

interface Props {
  showShortStats?: boolean;
  stageTimings: StageTimings | null;
  stageCompleteCallback?: () => void;
  footerText?: string;
  game: Game;
  team: Team;
  preFooter?: (differenceToEnd: number, stageTimings: StageTimings) => React.ReactNode;
  allowSkip?: boolean;
  hideCountDown?: boolean;
  fetchPrevBalanceSheet: boolean;
}

export const GameFooter: React.FC<Props> = ({
  stageTimings,
  showShortStats,
  stageCompleteCallback,
  footerText,
  game,
  team,
  preFooter,
  allowSkip,
  hideCountDown,
  fetchPrevBalanceSheet
}) => {
  const { supabase } = useSupabase<'public'>();
  const [currentDifferenceToEnd, setCurrentDifferenceToEnd] = useState<number>();
  const totalDifference = differenceInMilliseconds(stageTimings?.stageEndTime ?? 0, stageTimings?.stageStartTime ?? 0);
  const [stageTimingsState, setStageTimingsState] = useState(stageTimings);
  const [teamBalanceSheet, setTeamBalanceSheet] = useState<BalanceSheet>();
  const [readyUpLoading, setReadyUpLoading] = useState(false);

  const [disableSkip, setDisableSkip] = useState(team?.status === 'awaitingNextPeriod');

  useEffect(() => {
    if (stageTimings) {
      if (stageTimingsState?.stageEndTime) setCurrentDifferenceToEnd(totalDifference);
    }
    setStageTimingsState(stageTimings);
  }, [stageTimings]);

  useInterval(
    () => {
      const currentTimeInServerTime = Date.now() - (stageTimingsState?.clockOffset ?? 0);

      if (stageTimingsState?.stageEndTime)
        setCurrentDifferenceToEnd(differenceInMilliseconds(stageTimingsState?.stageEndTime, currentTimeInServerTime));
    },
    (currentDifferenceToEnd ?? 0) >= 0 ? 1000 : null
  );

  useEffect(() => {
    const getTeamValues = async () => {
      if (fetchPrevBalanceSheet || game.periodType === 'yearEnd') {
        const { data, error } = await supabase
          .from('BalanceSheet')
          .select('*')
          .eq('teamId', team.id)
          .eq('year', game.year - 1)
          .single();
        setTeamBalanceSheet(data as BalanceSheet);
        if (error) console.log(error.message);
      }
    };
    getTeamValues();
  }, [game.year]);

  const cashBalance = teamBalanceSheet?.cash || 0;
  const [cashValueFrom, setCashValueFrom] = useState(cashBalance);
  const [cashValueTo, setCashValueTo] = useState(cashBalance);

  const debtBalance = teamBalanceSheet?.debt || 0;
  const [debtValueFrom, setDebtValueFrom] = useState(debtBalance);
  const [debtValueTo, setDebtValueTo] = useState(debtBalance);

  const equityBalance = teamBalanceSheet?.equity || 0;
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

  const skipPeriod = async () => {
    setReadyUpLoading(true);
    await readyUpTeam(game, team?.id);
    setDisableSkip(true);
    setReadyUpLoading(false);
  };

  useEffect(() => {
    if (allowSkip) {
      setDisableSkip(team?.status === 'awaitingNextPeriod');
    }
  }, [team?.status]);

  return (
    <>
      {preFooter && stageTimingsState && preFooter(currentDifferenceToEnd ?? 0, stageTimingsState)}
      {allowSkip && (
        <div className="bg-alpha-900">
          <div className="flex items-center justify-center gap-x-12 w-full p-6">
            <button className="[ dqButton ]" onClick={skipPeriod} disabled={disableSkip || !stageTimings}>
              {!readyUpLoading && 'Ready for next stage'}
              {readyUpLoading && <Ring size={20} color="white" />}
            </button>
          </div>
        </div>
      )}
      <div className="relative bg-alpha-800 pb-1.5 flex justify-between gap-6">
        {!hideCountDown && (
          <div id="countdownClock" className="flex items-center gap-1.5 p-6">
            <Timer className="w-6 h-6" strokeWidth={2} />
            <CountdownTimer currentDifferenceToEnd={currentDifferenceToEnd ?? 0} />
          </div>
        )}
        <div className={clsx('flex', hideCountDown && 'w-full')}>
          <p
            id={'footerText'}
            className={clsx(
              'self-center lg:max-w-none truncate text-right',
              game?.periodType !== 'yearEnd' ? 'pr-6 max-w-[10rem]' : 'w-full p-6'
            )}
            title={footerText ?? 'The next section will be starting soon'}
          >
            {footerText ?? 'The next section will be starting soon'}
          </p>

          {showShortStats && (
            <div id="footerFinancialStats" className="bg-alpha-950 px-6 h-full flex items-center gap-4">
              <Crown className="w-6 h-6 text-bravo" />
              <dl className="contents">
                <div className="flex flex-col">
                  <dt className="text-xs">Cash:</dt>
                  <dd className="font-semibold text-white">
                    $<Counter from={cashValueFrom} to={cashValueTo} />m
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-xs">Debt:</dt>
                  <dd className="font-semibold text-white">
                    {' '}
                    $<Counter from={debtValueFrom} to={debtValueTo} />m
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-xs">Equity:</dt>
                  <dd className="font-semibold text-white">
                    {' '}
                    $<Counter from={equityValueFrom} to={equityValueTo} />m
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
        {stageTimingsState && !hideCountDown && (
          <CountdownBar
            differenceToEnd={currentDifferenceToEnd ?? totalDifference}
            stageTimingsState={stageTimingsState}
            stageCompleteCallback={stageCompleteCallback}
            game={game}
          />
        )}
      </div>
    </>
  );
};
