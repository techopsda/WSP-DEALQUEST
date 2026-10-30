import { getTeamMemberString } from '@/lib/team/getTeamMemberString';
import { BidsWithCompaniesAndTeam } from '@/types/database';
import clsx from 'clsx';
import { toWords } from 'number-to-words';
import { Fragment } from 'react';

interface Props {
  teamCompanies: BidsWithCompaniesAndTeam[];
  teamId: string;
}

export const PostAuctionOverallSummary: React.FC<Props> = ({ teamCompanies, teamId }) => {
  const soldCompanies = teamCompanies?.filter((company) => (company?.amount ?? 0) > 0);

  return (
    <div className="w-full max-w-6xl">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-5xl text-white font-bold">Congratulations!</h1>
        <p className="text-2xl">
          {soldCompanies && soldCompanies?.length > 0 && 'The auction has ended, these companies have new owners'}
          {(!soldCompanies || soldCompanies?.length < 1) && 'The auction has ended, no companies have been sold.'}
        </p>
      </div>
      {/* companies and bids */}
      <div className="flex flex-col gap-12 py-24">
        {soldCompanies &&
          soldCompanies.map((winningBid, index) => (
            <Fragment key={winningBid?.id}>
              <div id={`newOwner${index}`} className="w-full grid grid-cols-9 gap-12">
                <div className="col-span-4 flex flex-col justify-center">
                  <p>
                    Auction{' '}
                    {winningBid?.Auction?.lot && isFinite(winningBid?.Auction?.lot)
                      ? toWords(winningBid?.Auction?.lot)
                      : winningBid?.Auction?.lot}
                  </p>
                  <h2 className="text-white text-2xl lg:text-4xl font-bold">{winningBid?.Company?.name}</h2>
                </div>
                <div
                  className={clsx(
                    'col-span-5 flex items-center justify-between p-6 border rounded-xl',
                    winningBid?.teamId === teamId
                      ? 'border-bravo text-bravo'
                      : 'border-success-light text-success-light'
                  )}
                >
                  <div>
                    <h2 className="text-2xl font-semibold">{winningBid?.Team?.name}</h2>
                    <p className="text-sm">{getTeamMemberString(winningBid?.Team?.Member ?? [])}</p>
                  </div>
                  <p className="font-bold text-4xl">${winningBid?.amount}m</p>
                </div>
              </div>
              <hr className="w-full border-alpha-highlight-dark" />
            </Fragment>
          ))}
      </div>
    </div>
  );
};
