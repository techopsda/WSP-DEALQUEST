import { Auction, Company, Sector, Earnings } from '@/types/database';

export type AuctionCompany = Auction & {
  Company:
    | (Company & {
        Sector: Sector | null;
        Earnings: Earnings[];
      })
    | null;
};
