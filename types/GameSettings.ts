export type GameSettings = {
  interestRate: { rate: number };
  equityInvestmentEarnings: { amount: number };
  practiceRoundQuestionEarnings: { amount: number };
  maxTeamsPerGame: { amount: number };
  maxMembersPerTeam: { amount: number };
  localEventAmounts: { amount: number };
  questionAmounts: { toAward: number; toDeduct: number };
  accountingAmounts: { toAward: number; toDeduct: number };
  practiceRoundMaxBid: { amount: number };
  bidAmount: { amount: number };
  maxDebtValue: { amount: number };
  fineAmount: { amount: number };
  showFullStop: { visible: boolean };
};

export type GameSetting<T extends keyof GameSettings> = Pick<GameSettings, T>;
