import getRiskRating from '@/components/instructorDashboard/GamePanel/GamePanelTable/util/getRiskRating';
import { Company, Earnings, Game, Sector } from '@/types/database';
import React from 'react';
import { CompanyWithSectorAndEarnings } from './companyAccordion/ExtendedCompanyType';
import _ from 'lodash';

export type CompanyKeys = (keyof Omit<
  Company & { Sector: Sector; Earnings: Earnings[] },
  'sectorId' | 'id' | 'year' | 'name'
>)[];

interface CompanyTableProps {
  companiesToDisplay: CompanyWithSectorAndEarnings[];
  game: Game;
  hiddenKeys?: CompanyKeys;
  extraColumns?: { header: string; content: (company: CompanyWithSectorAndEarnings) => React.ReactNode }[];
  setCompanyToList?: (companyId: CompanyWithSectorAndEarnings) => void;
  isAccountingStage?: boolean;
}

export const CompanyTable: React.FC<CompanyTableProps> = ({
  companiesToDisplay,
  game,
  hiddenKeys,
  extraColumns,
  setCompanyToList,
  isAccountingStage
}) => {
  return (
    <table id="analysisTable" className="[ dqTable ] text-lg w-full">
      <thead>
        <tr>
          <th></th>
          <th className="border-b border-alpha-400">
            <div className="flex justify-center text-lg">EBIT</div>
          </th>
          {extraColumns?.map((i) => {
            return <th key={'empty-header-' + i}></th>;
          })}
        </tr>
        <tr>
          <th>Company name</th>

          <th id="ebit">
            <table>
              <thead>
                <tr>
                  {companiesToDisplay &&
                    companiesToDisplay[0]?.Company?.Earnings?.map((est) => {
                      const analysisHeader = `analysisHeader${est?.year}`;

                      return (
                        <th id={`${analysisHeader}Est`} key={est.id}>
                          {est.year >= 0 ? `Y-${est.year}` : `Y-(${Math.abs(est.year)})`}{' '}
                          {est.year < game.year || (isAccountingStage && est.year <= game?.year) ? 'Actual.' : 'Est.'}
                        </th>
                      );
                    })}
                </tr>
              </thead>
            </table>
          </th>

          {extraColumns?.map((column, i) => {
            return <th key={'extra-column-' + i}>{column?.header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {companiesToDisplay?.map((data, index) => {
          setCompanyToList && setCompanyToList(data);
          const analysisRow = `analysisRow${index === companiesToDisplay?.length - 1 ? 'last' : index}`;

          return (
            <tr key={data?.Company?.id}>
              <td className="text-white font-medium">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-lg">
                      {data?.Company?.name}{' '}
                      {!hiddenKeys?.includes('Sector') && (
                        <span className="text-xs">({data?.Company?.Sector?.name})</span>
                      )}
                    </span>
                    {!hiddenKeys?.includes('reserve') && (
                      <div className="flex items-center gap-3 text-sm" id="analysisRow0Reserve">
                        <span>Reserve price: ${data?.Company?.reserve}m</span>
                      </div>
                    )}
                    {!hiddenKeys?.includes('salePrice') && (
                      <div className="flex items-center gap-3 text-sm" id="analysisRow0Reserve">
                        <span>Sale price: ${data?.Company?.salePrice}m</span>
                      </div>
                    )}
                  </div>
                  {!hiddenKeys?.includes('risk') && (
                    <div className="flex items-center gap-1">
                      Risk: {getRiskRating(data?.Company?.risk ?? 0, 5, 'w-4', 'h-4')}
                    </div>
                  )}
                </div>
              </td>

              <td id="ebitBodySection">
                <table>
                  <tbody>
                    <tr>
                      {data?.Company?.Earnings.map((est: Earnings) => (
                        <td id={`${analysisRow}Est`} key={est.id}>
                          ${est.amount}m
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </td>

              {extraColumns?.map((column, i) => {
                return <td key={'extra-body-' + i}>{column?.content && column.content(data)}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
