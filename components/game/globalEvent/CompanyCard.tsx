import getRiskRating from '@/components/instructorDashboard/GamePanel/GamePanelTable/util/getRiskRating';
import { Company } from '@/types/database';
import clsx from 'clsx';

interface CompanyCardProps {
  company: Company;
  type: string;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, type }) => {
  const isNegative = type.includes('negative');
  return (
    <div
      className="border-2 border-alpha-light-800 p-6 w-full rounded-xl flex items-center justify-between gap-6"
      key={company.id}
    >
      <div className="flex flex-col gap-3">
        {/* Company name */}
        <h2 className="text-2xl font-semibold text-alpha-light-100">{company.name}</h2>
        <dl className="flex items-center gap-3">
          <dt className="text-alpha-light-400">Risk:</dt>
          <dd className="flex items-center gap-1">
            {/* Company risk rating */}
            {getRiskRating(company.risk, 5)}
          </dd>
        </dl>
      </div>
      {/* outcome of event */}
      <p className={clsx('text-xl font-semibold', isNegative ? 'text-error-light' : 'text-success-light')}>
        {isNegative ? '-' : '+'}${company.risk}m income
      </p>
    </div>
  );
};
