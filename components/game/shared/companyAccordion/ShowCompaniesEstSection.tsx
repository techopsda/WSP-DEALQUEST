import { CompanyWithSectorAndEarnings } from './ExtendedCompanyType';

interface Props {
  data: CompanyWithSectorAndEarnings;
  footerSlot?: React.ReactNode;
}

export const CompanyValueEstPerYear: React.FC<Props> = ({ data, footerSlot }) => {
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between bg-alpha-450 rounded-t-lg py-3">
          {data?.Company?.Earnings.map((est) => (
            <p key={est.id} className="px-3">
              Y{est.year} Est
            </p>
          ))}
        </div>
        <div className="flex justify-between bg-white py-3 rounded-b-lg">
          {data?.Company?.Earnings.map((est) => (
            <p key={est.id} className="px-3 text-alpha">
              ${est.amount}m
            </p>
          ))}
        </div>
      </div>
      {footerSlot}
    </>
  );
};
