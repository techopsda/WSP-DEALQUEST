import { BalanceSheet, Finance, Game, GlobalEvent } from '@/types/database';
import { GameSetting } from '@/types/GameSettings';

export const calculateAccountingFields = (
  game: Game,
  globalEvent: GlobalEvent | null,
  settings: GameSetting<'practiceRoundQuestionEarnings' | 'interestRate'>,
  financeSheet?: Finance,
  balanceSheet?: BalanceSheet,
  prevBalanceSheet?: BalanceSheet,
  totalEarnings?: number
) => {
  const calculatedInterestRate =
    globalEvent?.type === 'increaseRates'
      ? (settings?.interestRate?.rate ?? 10) * 3
      : settings?.interestRate?.rate ?? 10;

  const debtBeforeInterest =
    (prevBalanceSheet?.debt ?? 0) + (financeSheet?.amountBorrowed ?? 0) - (financeSheet?.amountDebtPaid ?? 0); // debt done
  const debtInterest = Math.round(debtBeforeInterest * ((calculatedInterestRate ?? 0) / 100));

  const financeFunding =
    (financeSheet?.amountBorrowed ?? 0) + (financeSheet?.amountIncomeSale ?? 0) - (financeSheet?.amountDebtPaid ?? 0); //finance calculation done

  const quizFunding =
    game.year === 0 ? settings?.practiceRoundQuestionEarnings?.amount ?? 0 : balanceSheet?.quizFund ?? 0;

  const netIncome =
    (totalEarnings ?? 0) + (balanceSheet?.localEventFund ?? 0) + (balanceSheet?.globalEventFund ?? 0) - debtInterest; // net income ( consolidated EBIT + local event funding + global event funding - interest expenses)

  const cashForAuction =
    (prevBalanceSheet?.cash ?? 0) + (balanceSheet?.roundFund ?? 100) + quizFunding + financeFunding; // cash for auction done

  const subtotalForEquity =
    (prevBalanceSheet?.equity ?? 0) +
    (balanceSheet?.roundFund ?? 0) +
    quizFunding +
    netIncome -
    (balanceSheet?.maxDebtFine ?? 0); // equity ( beginning equity + round funding + quiz funding + net income ) NOTE add to equity

  const subtotalForCash =
    (prevBalanceSheet?.cash ?? 0) +
    quizFunding +
    (balanceSheet?.roundFund ?? 0) +
    financeFunding +
    netIncome -
    (balanceSheet?.auctionSpendings ?? 0); // cash ( beginning cash + round funding + quiz funding + ( debt issuance + cash made from selling companies - debt paid)  + (cash available on auction - cash spent on auction) + netIncome )

  return {
    finance: financeFunding ?? 0,
    debtIssuance: financeSheet?.amountBorrowed ?? 0,
    ebit: totalEarnings ?? 0,
    netIncome,
    interest: debtInterest,
    beginningEquity: prevBalanceSheet?.equity ?? 0,
    equitySubtotal: subtotalForEquity,
    beginningCash: prevBalanceSheet?.cash ?? 0,
    cashAvailabeForAuction: cashForAuction,
    cashSubtotal: subtotalForCash,
    calculatedInterestRate
  };
};
