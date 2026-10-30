import { useGameDetails } from '@/components/hooks/useGameDetails';
import { TooltipComponent } from '@/components/shared/TooltipComponent';
import { readyUpTeam } from '@/lib/team/readyUpTeam';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useSettings } from '@/submodules/supabase-functions/lib/settings/useSettings';
import { Game, InputAccounting, Team, Tournament, AccountsSheet, BalanceSheet } from '@/types/database';
import { GameSettings } from '@/types/GameSettings';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Joyride as ReactJoyride } from 'react-joyride';
import { GameNotifications } from '../data/GameNotifications';
import { RoundTextScreen } from '../RoundTextScreen';
import { RoundWrapper } from '../RoundWrapper';
import { TabGroup } from '../shared/Tabs';
import { useAccountingInputData } from './AccountingData';
import { AccountingSummary } from './AccountingSummary';
import { AccountsScreen } from './AccountsScreen';
import { calculateAccountingFields } from './calculateAccountingFields';
import { CompanyEarnings } from './CompanyEarnings';
import { getAccountScreenFields } from './getAccountScreenFields';
import { getGroupStatus } from './getGroupStatus';
import { AccountingCompaniesTab } from './TeamCompanies/AccountingCompaniesTab';
import { useTeamCompanies } from './useTeamCompanies';
import { getTooltips } from '@/lib/shared/getTooltips';

interface AccountingProps {
  game: Game;
  team: Team;
  tournament: Tournament;
}

export const Accounting: React.FC<AccountingProps> = ({ game, team, tournament }) => {
  const { supabase } = useSupabase<'public'>();
  const { stageTimings } = useGameDetails();

  const [submitted, setSubmitted] = useState(team?.status === 'awaitingNextPeriod');
  const { teamCompanies } = useTeamCompanies(team.id, game.year);

  const [teamInputs, setTeamInputs] = useState<InputAccounting>();
  const [accountsSheet, setAccountsSheets] = useState<AccountsSheet>();
  const isPracticeRound = game.year === 0;
  const [accountsFiled, setAccountsFiled] = useState(false);

  const [totalEarnings, setTotalEarnings] = useState<number>();

  const [sidebarAnimationEnded, setSidebarAnimationEnded] = useState(false);

  // get globalEvent, notifications, financeSheet , currentBalanceSheet and prevBalanceSheet data
  const { initialNotifications, currentBalanceSheet, prevBalanceSheet, financeSheet, globalEvent } =
    useAccountingInputData(team, game, supabase, tournament.practiceRound);

  const { getSettings } = useSettings<GameSettings>();
  const { interestRate, practiceRoundQuestionEarnings, accountingAmounts } = getSettings([
    'practiceRoundQuestionEarnings',
    'interestRate',
    'accountingAmounts'
  ]);
  const settings = { interestRate, practiceRoundQuestionEarnings };

  useEffect(() => {
    const getAllEarnings = async () => {
      if (teamCompanies) {
        const { data: allEarnings } = await supabase
          .from('Earnings')
          .select()
          .eq('year', game.year)
          .in('companyId', _.map(teamCompanies ?? [], 'companyId'));

        setTotalEarnings(_.sumBy(allEarnings ?? [], 'amount'));
      }
    };
    getAllEarnings();
  }, [teamCompanies]);

  useEffect(() => {
    const getAccountsSheetData = async () => {
      const { data: accountsSheetData, error: accountsSheetDataError } = await supabase
        .from('AccountsSheet')
        .select('*')
        .eq('teamId', team.id)
        .eq('year', game.year)
        .maybeSingle();
      if (accountsSheetData) {
        setAccountsSheets(accountsSheetData as AccountsSheet);
      }
      if (accountsSheetDataError) {
        console.log(`Could not fetch accountsSheet data: ${accountsSheetDataError.message}`);
      }
    };
    if (
      game.periodType === 'accounting' ||
      game.periodType === 'accountingResults' ||
      game.periodType === 'accountingSummary'
    ) {
      getAccountsSheetData();
    }
  }, [game, team?.status]);

  useEffect(() => {
    if (team?.status === 'awaitingNextPeriod' && game?.periodType === 'accounting') setAccountsFiled(true);
  }, [team]);

  const calculatedFields = calculateAccountingFields(
    game,
    globalEvent,
    settings,
    financeSheet,
    currentBalanceSheet,
    prevBalanceSheet as BalanceSheet,
    totalEarnings
  );
  const accountingFieldsObject = getAccountScreenFields(
    game,
    settings,
    calculatedFields,
    currentBalanceSheet,
    teamInputs
  );
  const accountingResultsFieldsObject = getAccountScreenFields(
    game,
    settings,
    calculatedFields,
    currentBalanceSheet,
    accountsSheet?.accountingInputs as InputAccounting
  );

  useEffect(() => {
    if (team?.status !== 'awaitingNextPeriod' && game?.periodType === 'accounting') setSubmitted(false);
  }, [team?.status]);

  const handleSubmit = async () => {
    setSubmitted(true);

    if (!accountsSheet) {
      const allFieldsWithGroup = _.flatMap(Object.entries(accountingFieldsObject), ([group, fieldGroup]) => {
        return _.flatMap(Object.entries(fieldGroup), ([, sectionFields]) => {
          return _.map(sectionFields, (field) => {
            return { ...field, value: Math.abs(field.value ?? 0), correctValue: Math.abs(field.correctValue), group };
          });
        });
      });
      const allUnansweredFields = allFieldsWithGroup.filter(
        (fieldWithGroup) =>
          !Object.keys(teamInputs ?? ({} as InputAccounting)).some((inputId) => inputId === fieldWithGroup.id)
      );

      let newTeamInputs: InputAccounting = teamInputs ?? ({} as InputAccounting);

      if (allUnansweredFields?.length > 0) {
        allUnansweredFields
          .filter((unansweredField) => game.year === 0 || !unansweredField?.practiceOnly)
          .forEach((unansweredField) => {
            newTeamInputs = { ...newTeamInputs, [unansweredField.id]: 0 };
          });

        setTeamInputs(newTeamInputs);
      }

      const correctFieldsWithGroup = allFieldsWithGroup.filter((field) => {
        const newField = { ...field, value: newTeamInputs?.[field.id as keyof InputAccounting] ?? field };

        if (!isPracticeRound && field.practiceOnly) return false;
        return Math.abs((newField.value as number) ?? 0) === newField.correctValue;
      });
      const groupedCorrectFields = _.groupBy(correctFieldsWithGroup, (field) => field.group);

      const correctGroupValues = {
        equity: getGroupStatus(groupedCorrectFields, allFieldsWithGroup, game, 'equity'),
        cash: getGroupStatus(groupedCorrectFields, allFieldsWithGroup, game, 'cash'),
        netIncome: getGroupStatus(groupedCorrectFields ?? 5, allFieldsWithGroup ?? 0, game, 'netIncome')
      };

      const { error } = await supabase
        .from('AccountsSheet')
        .insert({
          netIncome: correctGroupValues.netIncome,
          equity: correctGroupValues.equity,
          cash: correctGroupValues.cash,
          accountingInputs: newTeamInputs,
          teamId: team.id,
          year: game.year
        })
        .eq('teamId', team.id)
        .eq('year', game.year)
        .single();

      await readyUpTeam(game, team?.id);

      if (error) {
        console.log(error.message, 'accounts sheet Error');
      }
    }
  };

  const getFooterText = () => {
    if (game.periodType === 'accounting') {
      if (!submitted) {
        return 'File your accounts';
      }
      return 'Waiting for other teams to finish filing their accounts';
    }
  };

  const handleInputChange = (fieldId: string, newValue: string) => {
    if (newValue) {
      if (teamInputs) {
        setTeamInputs({
          ...teamInputs,
          [fieldId]: parseInt(newValue)
        });
      } else {
        setTeamInputs({ [fieldId as keyof InputAccounting]: parseInt(newValue) });
      }
    } else {
      setTeamInputs(_.omit(teamInputs, fieldId));
    }
  };

  const [showEquityResults, setShowEquityResults] = useState<boolean>(false);
  const [showCashResults, setShowCashResults] = useState<boolean>(false);
  useEffect(() => {
    if (game.periodType === 'accountingResults') {
      const equityTimeout = setTimeout(() => {
        setShowEquityResults(true);
      }, 3000);

      const cashTimeout = setTimeout(() => {
        setShowCashResults(true);
      }, 6000);

      return () => {
        clearTimeout(equityTimeout);
        clearTimeout(cashTimeout);
      };
    }
  }, [game.periodType]);

  const tabs = [
    {
      name: 'Accounts',
      content: (
        <>
          {currentBalanceSheet && game.periodType === 'accounting' && (
            <AccountsScreen
              game={game}
              handleInputChange={handleInputChange}
              accountingFieldsObject={accountingFieldsObject}
              isPracticeRound={isPracticeRound}
            />
          )}
          {game.periodType === 'accountingResults' && (
            <AccountsScreen
              game={game}
              accountingFieldsObject={accountingResultsFieldsObject}
              isGroupCorrect={accountsSheet}
              isPracticeRound={isPracticeRound}
              showEquityResults={showEquityResults}
              showCashResults={showCashResults}
            />
          )}
        </>
      ) // Input values will need to be remembered when changing tabs as the user will likely change tabs a number of times to check their notifications and companies for values needed on the account screen
    },
    {
      name: 'Companies',
      content: <AccountingCompaniesTab teamCompanies={teamCompanies} game={game} />
    },
    {
      name: 'Notifications',
      content: (
        <div className="bg-alpha-800 rounded-xl p-6 max-w-3xl">
          {initialNotifications && (
            <GameNotifications
              htmlDisplayMode="block"
              game={game}
              teamId={team.id}
              initialNotifications={initialNotifications}
              companies={teamCompanies}
              filterNotifications={true}
            />
          )}
        </div>
      )
    }
  ];

  const steps = getTooltips(game.periodType, game.year);

  return (
    <RoundWrapper
      tournament={tournament}
      stageCompleteCallback={game?.periodType === 'accounting' ? handleSubmit : undefined}
      game={game}
      team={team}
      header="Accounting"
      allowSkip={
        game?.periodType === 'accountingResults' ||
        game?.periodType === 'companyEarnings' ||
        game?.periodType === 'accountingSummary'
      }
      stageTimings={stageTimings}
      showSidebar={game.periodType === 'accountingPre' || game.periodType === 'accountingSummary'}
      justify="justify-start"
      setSidebarAnimationEnded={setSidebarAnimationEnded}
      footerSlot={
        game.periodType === 'accounting' &&
        submitted === false && (
          <div id="fileAccounts" className="bg-alpha-900 flex items-center justify-center gap-x-12 w-full p-6">
            {/* Button should be disabled until all fields have been filled in */}
            <button className="[ dqButton ]" onClick={handleSubmit}>
              File accounts
            </button>
          </div>
        )
      }
      footerText={getFooterText()}
    >
      {game.periodType === 'companyEarnings' && <CompanyEarnings teamCompanies={teamCompanies} game={game} />}

      {game.periodType === 'accountingPre' && (
        <div className="grow flex items-center">
          <RoundTextScreen title="Accounting" isIntro>
            <p className="text-center">
              Now you must calculate your end-of-year accounts.
              <br /> You will be required to submit your <strong>net income, equity</strong> and <strong>cash</strong>.
              <br />
              Accurate submissions will be rewarded.
            </p>
          </RoundTextScreen>
        </div>
      )}

      {game.periodType === 'accounting' && globalEvent && !accountsFiled && (
        <>
          <ReactJoyride
            run={game.year <= 1 && currentBalanceSheet && !submitted && sidebarAnimationEnded}
            steps={steps ?? []}
            tooltipComponent={TooltipComponent}

          />
          <div className="pb-12 flex flex-col justify-start items-center gap-6 w-full">
            <TabGroup tabs={tabs} />
          </div>
        </>
      )}
      {game.periodType === 'accounting' && accountsFiled && (
        <div className="w-full h-full flex items-center justify-center">
          <RoundTextScreen title="Accounting Complete">
            <p>You have filed your accounts for this year</p>
            <p className="text-base">
              A summary will be shown when the round timer ends or all teams finishing filing their accounts
            </p>
          </RoundTextScreen>
        </div>
      )}
      {game.periodType === 'accountingResults' && currentBalanceSheet && (
        <>
          <ReactJoyride
            run={game.year === 0 && currentBalanceSheet ? true : false}
            steps={steps ?? []}
            tooltipComponent={TooltipComponent}

          />
          <div className="pb-12 flex flex-col justify-start items-center gap-6 w-full">
            <TabGroup tabs={tabs} />
          </div>
        </>
      )}

      {game.periodType === 'accountingSummary' && accountsSheet && (
        <div className="grow flex items-center pb-24">
          <AccountingSummary
            game={game}
            accountsSheet={accountsSheet}
            toAward={accountingAmounts?.toAward ?? 5}
            toDeduct={accountingAmounts?.toDeduct ?? 0}
          />
        </div>
      )}
    </RoundWrapper>
  );
};
