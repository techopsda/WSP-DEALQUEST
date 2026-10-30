import { AuctionCompany } from '@/components/game/auction/AuctionCompanyType';
import { Game, TeamCompany } from '@/types/database';
import _ from 'lodash';

export const getSortedCompanyAuctions = (
  game: Game,
  initialAuctions: AuctionCompany[],
  teamCompanies: TeamCompany[]
) => {
  const orderedAuctions = _.orderBy(initialAuctions, (auction) => auction.lot, 'asc');
  const soldAuctions = orderedAuctions.filter((auction) => auction.active === false);
  const unsoldAuctions = orderedAuctions.filter((auction) => auction.active === true);

  const sortedAuctions = [...unsoldAuctions, ...soldAuctions];

  const practiceYearSortedAuctions = initialAuctions.filter((auction) =>
    teamCompanies.some((teamCompany) => teamCompany.companyId === auction.companyId)
  );
  const currentAuctionForPracticeYear = practiceYearSortedAuctions.find((auction) => auction.active === true);
  const currentAuction = unsoldAuctions.find((auction) => auction.active === true);

  const companyOnAuctionNow = game.year === 0 ? currentAuctionForPracticeYear : currentAuction;
  const sortedAuctionCompanies = game.year === 0 ? practiceYearSortedAuctions : sortedAuctions;

  return { sortedAuctionCompanies, companyOnAuctionNow };
};
