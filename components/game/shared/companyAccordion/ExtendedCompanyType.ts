import { Company, Earnings, Sector } from '@/types/database';

export type CompanyWithSectorAndEarnings = {
  Company: (Company & { Sector: Sector | null; Earnings: Earnings[] }) | null;
};
