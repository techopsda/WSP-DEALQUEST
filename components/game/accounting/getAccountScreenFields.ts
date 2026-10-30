import { AccountingFieldsObject } from '@/types/AccountingFieldsObject';
import { CalculatedAccountingFields } from '@/types/CalculatedAccountingFields';
import { BalanceSheet, Game, GamePeriodEnum, InputAccounting } from '@/types/database';
import { GameSetting } from '@/types/GameSettings';

export const getAccountScreenFields = (
  game: Game,
  settings: GameSetting<'practiceRoundQuestionEarnings' | 'interestRate'>,
  calculatedFields: CalculatedAccountingFields,
  balanceSheet?: BalanceSheet,
  accountingFormValues?: InputAccounting
): AccountingFieldsObject => {
  return {
    netIncome: {
      incomeBodyFields: [
        {
          id: 'consolidatedEBIT',
          label: 'Consolidated EBIT',
          correctValue: calculatedFields?.ebit,
          value: fallbackValue(accountingFormValues?.consolidatedEBIT, true, game),
          practiceOnly: true
        },
        {
          id: 'localEvent',
          label: 'Local events',
          correctValue: balanceSheet?.localEventFund ?? 0,
          value: fallbackValue(accountingFormValues?.localEvent, true, game),
          practiceOnly: true
        },
        {
          id: 'globalEvent',
          label: 'Global events',
          correctValue: balanceSheet?.globalEventFund ?? 0,
          value: fallbackValue(accountingFormValues?.globalEvent, true, game),
          practiceOnly: true
        },
        {
          id: 'interest',
          label: `Interest (${calculatedFields?.calculatedInterestRate ?? 0}%)`,
          correctValue:
            (accountingFormValues?.interest ?? 0) >= 0 ? calculatedFields?.interest : -calculatedFields?.interest,
          value: fallbackValue(accountingFormValues?.interest, true, game),
          practiceOnly: true
        }
      ],
      incomeFooterFields: [
        {
          id: 'netIncomeStatement',
          label: 'Net income',
          correctValue: calculatedFields?.netIncome,
          value: fallbackValue(accountingFormValues?.netIncomeStatement, false, game),
          practiceOnly: false
        }
      ]
    },
    equity: {
      equityBodyFields: [
        {
          id: 'beginningEquity',
          label: 'Beginning equity',
          correctValue: calculatedFields?.beginningEquity ?? 0,
          value: fallbackValue(accountingFormValues?.beginningEquity, true, game),
          practiceOnly: true
        },
        {
          id: 'roundFundingEquity',
          label: 'Round funding',
          correctValue: balanceSheet?.roundFund ?? 0,
          value: fallbackValue(accountingFormValues?.roundFundingEquity, true, game),
          practiceOnly: true
        },
        {
          id: 'quizFundingEquity',
          label: 'Quiz funding',
          correctValue:
            game.year === 0 ? settings?.practiceRoundQuestionEarnings?.amount ?? 0 : balanceSheet?.quizFund ?? 0,
          value: fallbackValue(accountingFormValues?.quizFundingEquity, true, game),
          practiceOnly: true
        },
        {
          id: 'netIncomeEquity',
          label: 'Net income',
          correctValue: calculatedFields?.netIncome,
          value: fallbackValue(accountingFormValues?.netIncomeEquity, true, game),
          practiceOnly: true
        }
      ],
      equityFooterFields: [
        {
          id: 'equitySubtotal',
          label: 'Equity subtotal',
          correctValue: calculatedFields?.equitySubtotal,
          value: fallbackValue(accountingFormValues?.equitySubtotal, false, game),
          practiceOnly: false
        }
      ]
    },
    cash: {
      cashBodyFields: [
        {
          id: 'beginningCash',
          label: 'Beginning cash',
          correctValue: calculatedFields?.beginningCash,
          value: fallbackValue(accountingFormValues?.beginningCash, true, game),
          practiceOnly: true
        },
        {
          id: 'roundFundingCash',
          label: 'Round funding',
          correctValue: balanceSheet?.roundFund ?? 0,
          value: fallbackValue(accountingFormValues?.roundFundingCash, true, game),
          practiceOnly: true
        },
        {
          id: 'quizFundingCash',
          label: 'Quiz funding',
          correctValue:
            game.year === 0 ? settings?.practiceRoundQuestionEarnings?.amount ?? 0 : balanceSheet?.quizFund ?? 0,
          value: fallbackValue(accountingFormValues?.quizFundingCash, true, game),
          practiceOnly: true
        },
        {
          id: 'debtIssuance',
          label: 'Debt issuance',
          correctValue: calculatedFields?.debtIssuance,
          value: fallbackValue(accountingFormValues?.debtIssuance, true, game),
          practiceOnly: true
        }
      ],
      cashAdditionalFields: [
        {
          id: 'cashAuctionSpent',
          label: 'Cash spent at auction',
          correctValue:
            (accountingFormValues?.cashAuctionSpent ?? 0) >= 0
              ? balanceSheet?.auctionSpendings ?? 0
              : -(balanceSheet?.auctionSpendings ?? 0),
          value: fallbackValue(accountingFormValues?.cashAuctionSpent, true, game),
          practiceOnly: true
        },
        {
          id: 'netIncomeCash',
          label: 'Net income',
          correctValue: calculatedFields?.netIncome,
          value: fallbackValue(accountingFormValues?.netIncomeCash, true, game),
          practiceOnly: true
        }
      ],
      cashFooterFields: [
        {
          id: 'cashSubtotal',
          label: 'Cash subtotal',
          correctValue: calculatedFields?.cashSubtotal,
          value: fallbackValue(accountingFormValues?.cashSubtotal, false, game),
          practiceOnly: false
        }
      ]
    }
  };
};

export const fallbackValue = (value: number | undefined, isPracticeOnly: boolean, game: Game) => {
  if (
    (!isPracticeOnly && game.year > 0 && game.periodType === 'accountingResults') ||
    (game.year === 0 && game.periodType === 'accountingResults')
  ) {
    return value ?? 0;
  } else {
    return value;
  }
};
