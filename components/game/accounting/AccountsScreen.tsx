import { AccountingFieldsObject } from '@/types/AccountingFieldsObject';
import { Game, AccountsSheet } from '@/types/database';
import clsx from 'clsx';
import _ from 'lodash';
import { AccountingInputGroup } from './AccountingInputGroup';

interface AccountsScreenProps {
  game: Game;
  accountingFieldsObject: AccountingFieldsObject;
  isPracticeRound: boolean;
  handleInputChange?: (fieldId: string, newValue: string) => void;
  showEquityResults?: boolean;
  showCashResults?: boolean;

  isGroupCorrect?: Pick<AccountsSheet, 'cash' | 'equity' | 'netIncome'>;
}

export const AccountsScreen: React.FC<AccountsScreenProps> = ({
  showEquityResults,
  showCashResults,
  isPracticeRound,
  isGroupCorrect,
  game,
  accountingFieldsObject,
  handleInputChange
}) => {
  const {
    cash: { cashAdditionalFields, cashBodyFields, cashFooterFields },
    equity: { equityBodyFields, equityFooterFields },
    netIncome: { incomeBodyFields, incomeFooterFields }
  } = accountingFieldsObject;

  const awarded = _.sum(Object.values(_.flatMap(isGroupCorrect, (isCorrect) => (isCorrect === true ? 5 : 0))));

  return (
    <div className="w-full flex flex-col items-center gap-12">
      <p className="text-2xl text-center max-w-4xl">
        {/* "year one" should be dynamic */}
        {game.periodType === 'accountingResults' ? (
          <>
            The Financial Edge Commission (FEC) has audited your{' '}
            {game.year === 0 ? 'practice year' : `year ${game.year}`} results. You have been awarded ${awarded ?? 0}m.
          </>
        ) : (
          <>
            Input your values against the line items using the actual company results. Check your answers before
            submitting, we don&apos;t accept amended filings.
          </>
        )}
      </p>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-[1680px]">
        <div
          className={clsx(
            game.periodType === 'accountingResults' && 'opacity-0',
            game.periodType === 'accountingResults' && 'animation-fadeIn'
          )}
        >
          <AccountingInputGroup
            game={game}
            title="Income statement extract"
            fields={incomeBodyFields}
            footerFields={incomeFooterFields}
            submitted={game.periodType === 'accountingResults'}
            isPracticeRound={isPracticeRound}
            isGroupCorrect={isGroupCorrect?.netIncome ?? false}
            handleInputChange={handleInputChange}
          />
        </div>
        <div
          className={clsx(
            game.periodType === 'accountingResults' && 'opacity-0',
            game.periodType === 'accountingResults' && showEquityResults && 'animation-fadeIn'
          )}
        >
          <AccountingInputGroup
            game={game}
            title="Equity"
            fields={equityBodyFields}
            footerFields={equityFooterFields}
            submitted={showEquityResults}
            isPracticeRound={isPracticeRound}
            isGroupCorrect={isGroupCorrect?.equity ?? false}
            handleInputChange={handleInputChange}
          />
        </div>
        <div
          className={clsx(
            game.periodType === 'accountingResults' && 'opacity-0',
            game.periodType === 'accountingResults' && showCashResults && 'animation-fadeIn'
          )}
        >
          <AccountingInputGroup
            game={game}
            title="Cash"
            fields={cashBodyFields}
            footerFields={cashFooterFields}
            additionalFields={cashAdditionalFields}
            submitted={showCashResults}
            isPracticeRound={isPracticeRound}
            isGroupCorrect={isGroupCorrect?.cash ?? false}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};
