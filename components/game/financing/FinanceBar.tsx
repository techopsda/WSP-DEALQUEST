import { CompanyWithSectorAndEarnings } from '../shared/companyAccordion/ExtendedCompanyType';
import useLocalStorage from '@/components/hooks/useLocalStorage';
import { Game } from '@/types/database';
import { Counter } from '../Counter';
import { useEffect, useState } from 'react';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { readyUpTeam } from '@/lib/team/readyUpTeam';
interface Props {
  sellingIncome: number | undefined;
  borrowValue: number;
  companiesForSale: CompanyWithSectorAndEarnings[];
  debtPaidDown: number;
  game: Game;
  income: number;
  setIsFinanceCompleted: (isFinanceCompleted: boolean) => void;
  isPracticeRound: boolean;
}

export const FinanceBar: React.FC<Props> = ({
  sellingIncome,
  borrowValue,
  companiesForSale,
  debtPaidDown,
  game,
  income,
  setIsFinanceCompleted,
  isPracticeRound
}) => {
  const [teamId] = useLocalStorage('teamId', '');
  const { supabase } = useSupabase<'public'>();

  const [borrowingValueFrom, setBorrowingValueFrom] = useState(borrowValue);
  const [borrowingValueTo, setBorrowingValueTo] = useState(borrowValue);

  const [incomeValueFrom, setIncomeValueFrom] = useState(sellingIncome);
  const [incomeValueTo, setIncomeValueTo] = useState(sellingIncome);

  const [debtValueFrom, setDebtValueFrom] = useState(debtPaidDown);
  const [debtValueTo, setDebtValueTo] = useState(debtPaidDown);

  const companiesNum = companiesForSale.length;

  const [companiesNumFrom, setCompaniesNumFrom] = useState(companiesNum);
  const [companiesNumTo, setCompaniesNumTo] = useState(companiesNum);

  const cashToChange = borrowValue + (sellingIncome ?? 0) - debtPaidDown;

  const [cashChangeFrom, setCashChangeFrom] = useState(0);
  const [cashChangeTo, setCashChangeTo] = useState(cashToChange);

  const financeBarObjects = [
    {
      name: 'Borrowing:',
      content: <Counter from={borrowingValueFrom || 0} to={borrowingValueTo || 0} />
    },
    {
      name: 'Selling:',
      content: <Counter from={companiesNumFrom || 0} to={companiesNumTo || 0} />
    },
    {
      name: 'Cash from selling comapnies:',
      content: <Counter from={incomeValueFrom || 0} to={incomeValueTo || 0} />
    },
    {
      name: 'Debt paid down:',
      content: <Counter from={debtValueFrom || 0} to={debtValueTo || 0} />
    },
    {
      name: 'Cash change:',
      content: <Counter from={cashChangeFrom || 0} to={cashChangeTo || 0} />
    }
  ];

  const filteredFinanceBarObjects = financeBarObjects.filter(
    (tab) =>
      !(game.year !== 5 && tab.name === 'Selling:') &&
      !(game.year !== 5 && tab.name === 'Cash from selling comapnies:') &&
      !(game.year !== 5 && tab.name === 'Debt paid down:') &&
      !(game.year !== 5 && tab.name === 'Cash change:') &&
      !(game.year === 5 && tab.name === 'Borrowing:')
  );

  //get company's for sale ids
  const companiesForSaleIds = companiesForSale.map((company) => company?.Company?.id);

  const disableInPracticeRound = isPracticeRound && borrowValue <= 0;

  //function to complete financing stage inserting current values into Finance Table (P.S: update balanceSheet happens in notifyTeamOnFinanceActivites.ts on moviing to next period - financePost)
  const financeCompleted = async () => {
    //inserting data into Finance table for the current year
    if (game.year > 0) {
      await supabase
        .from('Finance')
        .update({
          amountBorrowed: borrowValue ?? 0,
          amountDebtPaid: debtPaidDown ?? 0,
          amountIncomeSale: income ?? 0
        })
        .eq('teamId', teamId)
        .eq('year', game.year);
    }

    //update TeamCompany table with yearSold value on sold companies
    await supabase
      .from('TeamCompany')
      .update({
        yearSold: game.year
      })
      .in('companyId', companiesForSaleIds);

    await readyUpTeam(game, teamId);

    setIsFinanceCompleted(true);
  };

  useEffect(() => {
    setBorrowingValueFrom(borrowingValueTo);
    setBorrowingValueTo(borrowValue);
  }, [borrowValue]);

  useEffect(() => {
    setDebtValueFrom(debtValueTo);
    setDebtValueTo(debtPaidDown);
  }, [debtPaidDown]);

  useEffect(() => {
    setIncomeValueFrom(incomeValueTo);
    setIncomeValueTo(sellingIncome);
  }, [sellingIncome]);

  useEffect(() => {
    setCompaniesNumFrom(companiesNumTo);
    setCompaniesNumTo(companiesNum);
  }, [companiesNum]);

  useEffect(() => {
    setCashChangeFrom(cashChangeTo);
    setCashChangeTo(cashToChange);
  }, [cashToChange]);

  return (
    <div className="bg-alpha-900">
      <dl className="flex items-center justify-center gap-x-12 w-full p-6">
        <div className="flex flex-row items-center space-x-8 justify-between">
          {filteredFinanceBarObjects &&
            filteredFinanceBarObjects.map((financingTab, i) => (
              <div className="flex-col" key={'finance-' + i}>
                <dt>{financingTab.name}</dt>
                <dd className="text-white text-xl font-bold">
                  {financingTab.name !== 'Selling:' && '$'}
                  {financingTab.content}
                  {financingTab.name !== 'Selling:' ? 'm' : ' companies'}
                </dd>
              </div>
            ))}
        </div>

        <div>
          <button
            id="completeFinancing"
            className="[ dqButton ]"
            onClick={financeCompleted}
            disabled={disableInPracticeRound}
          >
            Complete financing
          </button>
        </div>
      </dl>
    </div>
  );
};
