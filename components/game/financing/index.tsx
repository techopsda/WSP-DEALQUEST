'use client';
import { BalanceSheet, Finance, Game, Team, Tournament } from '@/types/database';
import { SellComponent } from '@/components/game/financing/SellComponent';
import { BorrowComponent } from '@/components/game/financing/BorrowComponent';
import { PayDebtComponent } from '@/components/game/financing/DebtPayComponent';
import { useEffect, useState } from 'react';
import { CompanyWithSectorAndEarnings } from '../shared/companyAccordion/ExtendedCompanyType';
import { FinanceBar } from '@/components/game/financing/FinanceBar';
import React from 'react';
import { useGameDetails } from '@/components/hooks/useGameDetails';
import { RoundWrapper } from '@/components/game/RoundWrapper';
import { RoundTextScreen } from '@/components/game/RoundTextScreen';
import { FinanceSummary } from '@/components/game/financing/FinanceSummary';
import { FinanceCompletedScreen } from './FinanceCompletedScreen';
import { TabGroup } from '../shared/Tabs';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Joyride as ReactJoyride } from 'react-joyride';
import { TooltipComponent } from '@/components/shared/TooltipComponent';
import { getPeriodLengthFromSeconds } from '../shared/getPeriodLengthFromSeconds';
import _ from 'lodash';
import { useSettings } from '@/submodules/supabase-functions/lib/settings/useSettings';
import { GameSettings } from '@/types/GameSettings';
import { getTooltips } from '@/lib/shared/getTooltips';

interface Props {
  tournament: Tournament;
  game: Game;
  team: Team;
}

export const Financing: React.FC<Props> = ({ tournament, game, team }) => {
  const { stageTimings } = useGameDetails();
  const { supabase } = useSupabase<'public'>();

  const { getSettings } = useSettings<GameSettings>();
  const { maxDebtValue, fineAmount } = getSettings(['maxDebtValue', 'fineAmount']);
  const maxDebtAmount = maxDebtValue?.amount ?? 100;
  const penaltyAmount = fineAmount?.amount ?? 300;

  const [currentBalanceSheet, setCurrentBalanceSheet] = useState<BalanceSheet>();
  const [finances, setFinances] = useState<Finance>();

  const [companies, setCompanies] = useState<CompanyWithSectorAndEarnings[] | null>([]);
  const [borrowValue, setBorrowValue] = useState(0);
  const [debtPaidDown, setDebtPaidDown] = useState<number>(0);
  const [sellingIncome, setSellingIncome] = useState<number>();
  const [isFinanceCompleted, setIsFinanceCompleted] = useState(false);

  const [sidebarAnimationEnded, setSidebarAnimationEnded] = useState(false);

  const isPracticeRound = game.year === 0;

  const [companiesForSale, setCompaniesForSale] = useState<Record<string, CompanyWithSectorAndEarnings | undefined>>( // array of all comapnies listed for sale
    {}
  );

  //adding newcoming company objects to the for sale array. The function it's called in the SellComponent onClick event.
  const onCompanyListedForSale = (company: CompanyWithSectorAndEarnings) => {
    setCompaniesForSale((existing) => ({
      ...existing,
      [company?.Company?.id ?? '']: existing[company?.Company?.id ?? ''] !== undefined ? undefined : company
    }));
  };
  //removing the delisted companies from the array. When delist button it's clicked onCompanyListedForSale function it's called carrying the object with it's id as a key if key exists it's removed.
  const arrayOfCompaniesForSale = React.useMemo(() => {
    return Object.values(companiesForSale).filter((c) => c !== undefined) as CompanyWithSectorAndEarnings[];
  }, [companiesForSale]);

  //calculating the sum of sale value of the companies
  const income = _.sum(_.flatMap(arrayOfCompaniesForSale, (companyForSale) => companyForSale?.Company?.salePrice));

  //updating the sum everytime it's changing
  useEffect(() => {
    setSellingIncome(income);
  }, [income]);

  useEffect(() => {
    const setFinanceCompleted = async () => {
      const { data: currentFinanceSheet } = await supabase
        .from('Finance')
        .select('*')
        .eq('teamId', team?.id)
        .eq('year', game?.year)
        .maybeSingle();
      setFinances(currentFinanceSheet as Finance);

      if (currentFinanceSheet) {
        if (
          currentFinanceSheet?.amountDebtPaid !== null &&
          currentFinanceSheet?.amountBorrowed !== null &&
          currentFinanceSheet?.amountIncomeSale !== null
        ) {
          setIsFinanceCompleted(true);
        }
      }
    };

    if (game?.periodType === 'financePost') {
      setFinanceCompleted();
    }
  }, [game.periodType]);

  useEffect(() => {
    const fetchTeamBalanceSheet = async () => {
      const { data: teamBalanceSheet, error: teamBalanceSheetError } = await supabase
        .from('BalanceSheet')
        .select('*')
        .eq('teamId', team.id)
        .eq('year', game.year)
        .maybeSingle();

      if (teamBalanceSheet) {
        setCurrentBalanceSheet(teamBalanceSheet);
      }
      if (teamBalanceSheetError) {
        console.log(`Could not fetch team balanceSheet data: ${teamBalanceSheetError.message} `);
      }
    };

    if (!currentBalanceSheet) fetchTeamBalanceSheet();
  }, [game.periodType]);

  const tabs = [
    {
      name: 'Borrow',
      content: (
        <BorrowComponent
          borrowValue={borrowValue}
          setBorrowValue={setBorrowValue}
          isPracticeRound={isPracticeRound}
          game={game}
        />
      )
    },
    {
      name: 'Sell',
      content: (
        <SellComponent
          team={team}
          companies={companies}
          setCompanies={setCompanies}
          companiesForSale={arrayOfCompaniesForSale}
          onCompanyListedForSale={onCompanyListedForSale}
          game={game}
        />
      )
    },
    {
      name: 'Pay Debt',
      content: (
        <PayDebtComponent debtPaidDown={debtPaidDown} setDebtPaidDown={setDebtPaidDown} game={game} team={team} />
      )
    }
  ];

  const getFooterText = () => {
    if (game.periodType === 'finance') {
      if (!isFinanceCompleted) {
        return 'Select financing';
      }
      return 'Waiting for all teams to complete financing';
    }
  };

  const filteredTabs = tabs.filter(
    (tab) => !(game.year !== 5 && tab.name === 'Pay Debt') && !(game.year !== 5 && tab.name === 'Sell')
  );

  const steps = getTooltips(game.periodType, game.year);

  return (
    <RoundWrapper
      stageCompleteCallback={
        game?.periodType === 'finance' && isPracticeRound && !isFinanceCompleted ? () => setBorrowValue(20) : undefined
      }
      tournament={tournament}
      game={game}
      team={team}
      header="Finance"
      setSidebarAnimationEnded={setSidebarAnimationEnded}
      stageTimings={stageTimings}
      showSidebar={game?.periodType === 'financePre' || game?.periodType === 'financePost'}
      justify="justify-start"
      allowSkip={game?.periodType === 'financePost'}
      footerSlot={
        game.periodType === 'finance' && (
          <>
            {isFinanceCompleted ? null : (
              <FinanceBar
                sellingIncome={sellingIncome}
                borrowValue={borrowValue}
                debtPaidDown={debtPaidDown}
                companiesForSale={arrayOfCompaniesForSale}
                income={income}
                game={game}
                setIsFinanceCompleted={setIsFinanceCompleted}
                isPracticeRound={isPracticeRound}
              />
            )}
          </>
        )
      }
      footerText={getFooterText()}
    >
      {game.periodType === 'financePre' && (
        <div className="grow flex items-center">
          <RoundTextScreen title="Financing" isIntro>
            <p>
              You will be given <u>{getPeriodLengthFromSeconds('finance', game)}</u> to select your financing this year,
              your team can take on debt to increase your cash available for the company auction
              {game.year === 5 && ' as well as selling any of your companies'}.
            </p>
          </RoundTextScreen>
        </div>
      )}
      {game.periodType === 'finance' && (
        <>
          <ReactJoyride
            run={game.year === 0 && sidebarAnimationEnded}
            steps={steps ?? []}
            tooltipComponent={TooltipComponent}

          />
          {isFinanceCompleted ? (
            <div className="grow flex items-center">
              <FinanceCompletedScreen />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-24 pb-24">
              {game.year === 0 ? (
                <BorrowComponent
                  borrowValue={borrowValue}
                  setBorrowValue={setBorrowValue}
                  isPracticeRound={isPracticeRound}
                  game={game}
                />
              ) : (
                <TabGroup tabs={filteredTabs} />
              )}
            </div>
          )}
        </>
      )}
      {game.periodType === 'financePost' && currentBalanceSheet && finances && (
        <div className="grow flex items-center pb-24">
          <ReactJoyride
            run={game.year === 0}
            steps={steps ?? []}
            tooltipComponent={TooltipComponent}

          />
          <FinanceSummary
            game={game}
            teamId={team.id}
            finances={finances}
            balanceSheet={currentBalanceSheet}
            fineAmount={penaltyAmount}
            maxDebtAmount={maxDebtAmount}
          />
        </div>
      )}
    </RoundWrapper>
  );
};
