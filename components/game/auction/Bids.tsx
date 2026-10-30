import { Game, Bid, Team, Member } from '@/types/database';
import _ from 'lodash';
import { ChevronsUp } from 'lucide-react';
import { Counter } from '../Counter';
import { AuctionCompany } from './AuctionCompanyType';
import { TeamBid } from './TeamBid';
import { TeamBiddingButtons } from './TeamBiddingButtons';
import { toWords } from 'number-to-words';

interface Props {
  game: Game;
  realtimeBids: Bid[];
  companyOnAuctionNow: AuctionCompany | undefined;
  teams: Team[];
  members: Member[];
  teamId: string;
  setTeamIsOut: (teamIsOut: boolean) => void;
  teamIsOut: boolean;
  maxBidAmount: number;
  currentAuctionOutOfTime: boolean;
  currentBidAmount: number;
}

export const Bids: React.FC<Props> = ({
  game,
  realtimeBids,
  companyOnAuctionNow,
  teams,
  members,
  teamId,
  setTeamIsOut,
  teamIsOut,
  maxBidAmount,
  currentAuctionOutOfTime,
  currentBidAmount
}) => {
  //get the compnay's reserve that teams are currently bidding for.
  const companyReserve = companyOnAuctionNow?.Company?.reserve as number;
  //order bids so the last bids will be shown at the top
  const orderedBids = _.orderBy(realtimeBids, (bid) => bid.amount, 'desc');

  //find last bid value or set value to company reserve as defalut - 5 . Why - 5 ? Because the bid goes + 5 for now.
  const bidAmount = orderedBids[0]?.amount ?? companyReserve - currentBidAmount;
  const lastBidTeamId = orderedBids[0]?.teamId;

  const lotNumber = companyOnAuctionNow?.lot;
  const lotNumberToWords = typeof lotNumber === 'number' && isFinite(lotNumber) ? toWords(lotNumber) : '';

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-end justify-between gap-6 text-white text-2xl">
        <div className="flex flex-col gap-3">
          <p className="text-base text-alpha-light-800">Auction {lotNumberToWords}</p>
          <h1 className="text-4xl font-semibold leading-none">{companyOnAuctionNow?.Company?.name}</h1>
        </div>
        <div className="flex gap-1">
          {/* This should show for a couple of seconds when a bit comes in */}
          <ChevronsUp className="[ animate-chevron ] w-6 h-6 shrink-0 text-success-light" />
          <p className="text-5xl font-light leading-none">
            ${/* This needs the from and to updating for the counter to work properly */}
            <Counter from={orderedBids[1]?.amount || 0} to={orderedBids[0]?.amount || 0} />m
          </p>
        </div>
      </div>
      <hr className="flex-grow border-alpha-highlight-dark border-1" />
      <TeamBiddingButtons
        companyOnAuctionNow={companyOnAuctionNow}
        teamId={teamId}
        companyReserve={companyReserve}
        bidAmount={bidAmount}
        game={game}
        lastBidTeamId={lastBidTeamId}
        setTeamIsOut={setTeamIsOut}
        teamIsOut={teamIsOut}
        maxBidAmount={maxBidAmount}
        currentAuctionOutOfTime={currentAuctionOutOfTime}
        currentBidAmount={currentBidAmount}
      />
      <TeamBid orderedBids={orderedBids} teams={teams} members={members} teamId={teamId} />
    </div>
  );
};
