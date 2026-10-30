export const getBalanceSheetYear = (gameYear: number, hasPracticeYear: boolean) => {
  if ((hasPracticeYear && gameYear === 0) || (!hasPracticeYear && gameYear === 1)) {
    return {
      fetchPrevBalanceSheet: false
    };
  } else {
    return {
      fetchPrevBalanceSheet: true
    };
  }
};
