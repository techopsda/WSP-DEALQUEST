import clsx from 'clsx';
import { AuctionCompany } from './AuctionCompanyType';
import SoldStamp from '@/components/shared/SoldStamp';
import getRiskRating from '@/components/instructorDashboard/GamePanel/GamePanelTable/util/getRiskRating';
import { Game, TeamCompany } from '@/types/database';
import _ from 'lodash';

interface Props {
  companies: AuctionCompany[];
  companyOnAuctionNow: AuctionCompany | undefined;
  game: Game;
  auctionPeriod: string;
  alreadyOwnedCompanies: TeamCompany[];
}

export const AuctionCompanies: React.FC<Props> = ({ companies, companyOnAuctionNow, game, alreadyOwnedCompanies }) => {
  const isTeamCompany = (companyId: string): boolean => {
    return alreadyOwnedCompanies.some((ownedCompany) => ownedCompany.companyId === companyId);
  };
  const firstEarning = companies[0]?.Company?.Earnings?.findIndex((earning) => earning.year === game.year - 3);

  return (
    <div className="w-full flex flex-col gap-6 overflow-hidden">
      {companies && (
        <div className="w-full overflow-x-auto">
          <table className="[ dqTable ] w-full text-lg ">
            <thead>
              <tr>
                <th></th>
                <th className="border-b border-alpha-400">
                  <div className="flex justify-center text-lg">EBIT</div>
                </th>
              </tr>
              <tr>
                <th>
                  <p className="pl-6">Company</p>
                </th>

                <th>
                  <table>
                    <thead>
                      <tr>
                        {companies &&
                          companies[0]?.Company?.Earnings.slice(firstEarning, (firstEarning ?? 0) + 7).map(
                            (est, index) => {
                              const analysisHeader = `analysisHeader${
                                index === companies?.length - 1 ? 'last' : index
                              }`;

                              return (
                                <th id={`${analysisHeader}Est`} key={est.id}>
                                  {est.year >= 0 ? `Y-${est.year}` : `Y-(${Math.abs(est.year)})`}{' '}
                                  {est.year < game.year ? 'Actual.' : 'Est.'}
                                </th>
                              );
                            }
                          )}
                      </tr>
                    </thead>
                  </table>
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((auction, i) => {
                const earnings = auction?.Company?.Earnings;

                return (
                  <tr
                    key={auction.id}
                    className={clsx(
                      !auction.active ? 'font-normal' : auction.lot === companyOnAuctionNow?.lot && 'font-bold',
                      !auction.active
                        ? 'text-alpha-300'
                        : auction.lot !== companyOnAuctionNow?.lot
                        ? 'text-light-900'
                        : auction.lot === companyOnAuctionNow?.lot && 'bg-alpha-highlight bg-opacity-10 text-white'
                    )}
                  >
                    <td className="relative">
                      {/* This should check that the item actually did sell */}
                      {auction.sold && (
                        <SoldStamp
                          className={clsx(
                            'absolute left-6 top-1/2 -translate-y-1/2 max-w-[5rem]',
                            isTeamCompany(auction?.Company?.id ?? '') ? 'text-bravo' : 'text-error'
                          )}
                        />
                      )}
                      <div className="pl-6 flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-lg">
                            {auction?.Company?.name} <span className="text-xs">({auction?.Company?.Sector?.name})</span>
                          </span>
                          <div className="flex items-center gap-3 text-sm">
                            <span>Reserve price: ${auction?.Company?.reserve}m</span>
                          </div>
                        </div>
                        <div className={clsx('flex items-center gap-1', !auction.active && 'opacity-30')}>
                          {getRiskRating(auction?.Company?.risk ?? 0, 5, 'w-4', 'h-4')}
                        </div>
                      </div>
                    </td>

                    <td>
                      <table>
                        <tbody>
                          <tr>
                            {earnings?.slice(firstEarning, (firstEarning ?? 0) + 7)?.map((earning, index) => {
                              return (
                                <td key={earning.id}>
                                  <p className={clsx(index === earnings.length - 1 && 'pr-6')}>${earning.amount}m</p>
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
