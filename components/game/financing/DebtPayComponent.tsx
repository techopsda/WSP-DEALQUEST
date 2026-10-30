import useLocalStorage from '@/components/hooks/useLocalStorage';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Game } from '@/types/database';
import { Team } from '@prisma/client';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Counter } from '../Counter';
import { EditDebtValue } from './editDebtAmountButton';

interface Props {
  game: Game;
  debtPaidDown: number | 0;
  setDebtPaidDown: (debtPaidDown: number) => void;
  team: Team;
}
export const PayDebtComponent: React.FC<Props> = forwardRef(({ debtPaidDown, setDebtPaidDown, game, team }, ref) => {
  const [currentDebt, setCurrentDebt] = useState<number>(0);
  const { supabase } = useSupabase<'public'>();
  const [teamId] = useLocalStorage('teamId', '');

  useEffect(() => {
    const getDebt = async () => {
      const { data } = await supabase
        .from('BalanceSheet')
        .select('debt')
        .eq('year', game.year)
        .eq('teamId', teamId)
        .single();
      if (data) {
        setCurrentDebt(data.debt as number);
      }
    };
    getDebt();
  }, []);

  const [debtFrom, setDebtFrom] = useState<number>(debtPaidDown);
  const [debtTo, setDebtTo] = useState<number>(debtPaidDown);

  useMemo(() => {
    setDebtFrom(debtTo);
    setDebtTo(debtPaidDown);
  }, [debtPaidDown]);

  const valueUp = [
    {
      label: '+$1m',
      value: 1,
      disabled: debtPaidDown > currentDebt - 1
    },
    {
      label: '+$5m',
      value: 5,
      disabled: debtPaidDown > currentDebt - 5
    }
  ];

  const valueDown = [
    {
      label: '-$5m',
      value: -5,
      disabled: debtPaidDown < 5
    },
    {
      label: '-$1m',
      value: -1,
      disabled: debtPaidDown < 1
    }
  ];

  return (
    <>
      {currentDebt !== 0 ? (
        <>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl text-white font-bold text-center"> How much would you like to pay off?</h1>
            <p className="text-xl">
              Use the buttons below to choose the amount of debt you would like to pay off this year. Once finished
              click on Complete Financing.
            </p>
          </div>
          <div className="flex gap-6 items-center justify-center">
            <div className="flex gap-6">
              {valueDown.map((val) => (
                <EditDebtValue
                  key={val.value}
                  val={val}
                  debtPaidDown={debtPaidDown}
                  setDebtPaidDown={setDebtPaidDown}
                />
              ))}
            </div>
            <div className="relative bg-alpha-900 text-white font-semibold w-64 h-56 rounded-xl">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl">
                $<Counter from={debtFrom} to={debtTo} />m
              </span>
            </div>
            <div className="flex gap-6">
              {valueUp.map((val) => (
                <EditDebtValue
                  key={val.value}
                  val={val}
                  debtPaidDown={debtPaidDown}
                  setDebtPaidDown={setDebtPaidDown}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-2xl font-medium text-white">
          Congratulations <strong className="text-bravo font-semibold">{team.name}</strong> currently has zero debt.
        </p>
      )}
    </>
  );
});
