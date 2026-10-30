export const getStageName = (stage: number) => {
  if (stage === 1) return 'Equity Investment';
  if (stage === 2) return 'Questions';
  if (stage === 3) return 'Analysis';
  if (stage === 4) return 'Financing';
  if (stage === 5) return 'Auction';
  if (stage === 6) return 'Local Event';
  if (stage === 7) return 'Global Event';
  if (stage === 8) return 'Accounting';
  if (stage === 9) return 'End of year results';
};
