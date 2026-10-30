'use client';
import { Game } from '@/types/database';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import { CompanyWithSectorAndEarnings } from './ExtendedCompanyType';
import { CompanyValueEstPerYear } from './ShowCompaniesEstSection';
import { CompanyHeader } from './ShowCompaniesHeader';

interface Props {
  data: CompanyWithSectorAndEarnings;
  additionalClasses?: string;
  backgroundColor?: string;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  showReserve?: boolean;
  showSalePrice?: boolean;
  game: Game;
}

export const Company: React.FC<Props> = ({
  additionalClasses,
  backgroundColor = 'bg-alpha-light-100',
  headerSlot,
  footerSlot,
  showReserve,
  showSalePrice,
  data,
  game
}) => {
  return (
    <div className={clsx('w-full rounded-xl overflow-hidden', backgroundColor, additionalClasses)}>
      <Disclosure>
        {({ open }) => (
          <Fragment key={data?.Company?.id}>
            {data?.Company && (
              <>
                <CompanyHeader
                  open={open}
                  companyName={data?.Company?.name}
                  companyReserve={data?.Company?.reserve}
                  currentCompanyEBIT={
                    data.Company.Earnings.find((earnings) => earnings.year === game.year)?.amount ?? 0
                  }
                  companyRisk={data.Company.risk}
                  sectorName={data?.Company?.Sector?.name ?? ''}
                  headerSlot={headerSlot}
                  showReserve={showReserve}
                  showSalePrice={showSalePrice}
                  // id={data.Company.id}
                />
                <Disclosure.Panel>
                  <CompanyValueEstPerYear data={data} footerSlot={footerSlot} />
                </Disclosure.Panel>
              </>
            )}
          </Fragment>
        )}
      </Disclosure>
    </div>
  );
};
