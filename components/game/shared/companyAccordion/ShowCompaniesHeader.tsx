import getRiskRating from '@/components/instructorDashboard/GamePanel/GamePanelTable/util/getRiskRating';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

interface CompanyHeaderProps {
  companyName: string;
  companyReserve: number;
  currentCompanyEBIT: number;
  sectorName: string;
  companyRisk: number;
  open: boolean;
  headerSlot?: React.ReactNode;
  showReserve?: boolean;
  showSalePrice?: boolean;
  id?: string;
}

export const CompanyHeader: React.FC<CompanyHeaderProps> = ({
  companyName,
  companyReserve,
  currentCompanyEBIT,
  sectorName,
  companyRisk,
  open,
  headerSlot,
  showReserve = true,
  showSalePrice = false,
  id
}) => {
  const salePrice = currentCompanyEBIT * 4;
  return (
    <Disclosure.Button className="w-full p-6 flex flex-col gap-3 text-alpha-highlight-light relative" key={id}>
      <div className="absolute flex h-full items-center justify-center">{headerSlot}</div>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">{companyName}</h1>
        <div className="flex items-center gap-6">
          <ChevronRight
            className={clsx('duration-150 text-alpha-light-800', open && 'rotate-90 transform')}
          ></ChevronRight>
        </div>
      </div>
      <hr className="w-full border-gray-300" />
      <div className="w-full flex items-center justify-between gap-12">
        <div className="flex items-center gap-12">
          {showReserve && (
            <p>
              Reserve: <span className="font-semibold text-alpha-highlight">${companyReserve}m</span>
            </p>
          )}
          {showSalePrice && (
            <p>
              Sale price: <span className="font-semibold text-alpha-highlight">${salePrice}m</span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <p>Risk:</p>
          <div className="flex items-center gap-1.5">{getRiskRating(companyRisk, 5)}</div>
        </div>
      </div>
    </Disclosure.Button>
  );
};
