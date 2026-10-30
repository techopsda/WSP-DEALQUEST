type PeriodsType = {
  type: string;
  periodLength: number;
  practiceLength: number;
  yearFiveLength?: number;
  stage: number;
};

export const periods = [
  { type: 'welcome', periodLength: 120, practiceLength: 120, stage: 0 },
  { type: 'gamePreview', periodLength: 15, practiceLength: 15, stage: 0 },
  { type: 'yearStart', periodLength: 5, practiceLength: 5, stage: 0 },
  { type: 'equityInvestment', periodLength: 5, practiceLength: 20, stage: 1 },
  { type: 'questionsPre', periodLength: 10, practiceLength: 20, stage: 2 },
  { type: 'questions', periodLength: 180, practiceLength: 180, stage: 2 },
  { type: 'questionsPost', periodLength: 10, practiceLength: 20, stage: 2 },
  { type: 'analysisPre', periodLength: 5, practiceLength: 15, stage: 3 },
  { type: 'analysis', periodLength: 300, practiceLength: 60, stage: 3 },
  { type: 'analysisPost', periodLength: 5, practiceLength: 10, stage: 3 },
  { type: 'financePre', periodLength: 5, practiceLength: 10, stage: 4 },
  { type: 'finance', periodLength: 30, practiceLength: 40, yearFiveLength: 180, stage: 4 },
  { type: 'financePost', periodLength: 10, practiceLength: 15, stage: 4 },
  { type: 'auctionPre', periodLength: 5, practiceLength: 10, stage: 5 },
  { type: 'auction', periodLength: 10, practiceLength: 30, stage: 5 },
  { type: 'auctionSold', periodLength: 5, practiceLength: 5, stage: 5 },
  { type: 'auctionPost', periodLength: 20, practiceLength: 20, stage: 5 },
  { type: 'auctionPostSummary', periodLength: 10, practiceLength: 15, stage: 5 },
  { type: 'localEventPre', periodLength: 5, practiceLength: 15, stage: 6 },
  { type: 'localEvent', periodLength: 10, practiceLength: 10, stage: 6 },
  { type: 'localEventPost', periodLength: 15, practiceLength: 15, stage: 6 },
  { type: 'globalEventPre', periodLength: 5, practiceLength: 15, stage: 7 },
  { type: 'globalEvent', periodLength: 20, practiceLength: 20, stage: 7 },
  { type: 'companyEarnings', periodLength: 25, practiceLength: 25, stage: 8 },
  { type: 'accountingPre', periodLength: 5, practiceLength: 15, stage: 8 },
  { type: 'accounting', periodLength: 180, practiceLength: 300, stage: 8 },
  { type: 'accountingResults', periodLength: 60, practiceLength: 300, stage: 8 },
  { type: 'accountingSummary', periodLength: 30, practiceLength: 30, stage: 8 },
  { type: 'yearEnd', periodLength: 30, practiceLength: 30, stage: 9 },
  { type: 'gameEnd', periodLength: 5, practiceLength: 5, stage: 10 }
] as PeriodsType[];
