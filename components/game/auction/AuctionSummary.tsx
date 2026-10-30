import { getTeamMemberString } from '@/lib/team/getTeamMemberString';
import { BidsWithCompaniesAndTeam, Game, Team } from '@/types/database';
import _ from 'lodash';
import { AuctionCompany } from './AuctionCompanyType';
import { toWords } from 'number-to-words';

interface Props {
  bidsWithTeamData: BidsWithCompaniesAndTeam[];
  companyOnAuctionNow: AuctionCompany | undefined;
  teams: Team[];
  auctions: AuctionCompany[];
  game: Game;
}

export const AuctionSummary: React.FC<Props> = ({ bidsWithTeamData, companyOnAuctionNow, teams, auctions, game }) => {
  const currentAuctionLotIndex = _.orderBy(auctions, (auction) => auction?.lot, 'asc').findIndex(
    (auction) => companyOnAuctionNow?.id === auction?.id
  );

  const lotNumberToWords =
    typeof companyOnAuctionNow?.lot === 'number' && isFinite(companyOnAuctionNow?.lot)
      ? toWords(companyOnAuctionNow?.lot)
      : '';

  return (
    <div className="text-center flex flex-col gap-6 w-full max-w-2xl">
      <p className="font-light">Auction lot {lotNumberToWords}</p>
      <h1 className="text-4xl font-bold text-white">{companyOnAuctionNow?.Company?.name}</h1>
      <hr className="flex-grow border-alpha-highlight-dark border-1" />
      {bidsWithTeamData.length > 0 && (
        <>
          <p className="text-center">New Owners</p>
          <div
            id="newOwner"
            className="flex flex-row items-center justify-between w-full border p-6 rounded-xl border-success-light text-success-light"
          >
            <div>
              <p className="text-3xl font-bold">{bidsWithTeamData[bidsWithTeamData.length - 1]?.Team?.name}</p>
              <p>{getTeamMemberString(bidsWithTeamData?.[bidsWithTeamData.length - 1]?.Team?.Member ?? [])}</p>
            </div>
            <div>
              <p className="text-4xl font-bold">${bidsWithTeamData[bidsWithTeamData.length - 1]?.amount}m</p>
            </div>
          </div>
        </>
      )}
      {bidsWithTeamData.length <= 0 && <p>No team has bid for this company</p>}

      {game.year !== 0 && currentAuctionLotIndex + 1 !== auctions?.length && (
        <p>The next auction will be starting soon</p>
      )}
      {(currentAuctionLotIndex + 1 === auctions?.length || game.year === 0) && (
        <p className="mt-24">The auction summary will be shown soon</p>
      )}
    </div>
  );
};
