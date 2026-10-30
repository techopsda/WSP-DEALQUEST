import { Earnings } from '@/types/database';

interface CompanyEBITCurrentYearProps {
  earnings: Earnings[];
}

export const CompanyEBITCurrentYear: React.FC<CompanyEBITCurrentYearProps> = ({ earnings }) => {
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between bg-alpha-450 rounded-t-lg py-3">
          <p className="px-3">Y{earnings[0].year} Est EBIT</p>
          <p className=""> Y{earnings[0].year} Actual EBIT</p>
        </div>
        <div className="flex justify-between bg-white py-3 rounded-b-lg">
          <p className="px-3 text-alpha">${earnings[0].amount}m</p>
          <p className="px-3 text-alpha">$15m</p>
        </div>
      </div>
      {/* {footerSlot} */}
    </>
  );
};
