import { getTeamMemberString } from '@/lib/team/getTeamMemberString';
import { Bid, Member, Team } from '@/types/database';
import clsx from 'clsx';

interface Props {
  orderedBids: Bid[];
  teams: Team[];
  members: Member[];
  teamId: string;
}

export const TeamBid: React.FC<Props> = ({ orderedBids, teams, members, teamId }) => {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <p>Team</p>
          <p>Bid Amount</p>
        </div>
        <hr className="flex-grow border-alpha-highlight-dark border-1" />
      </div>
      <div className="flex flex-col gap-6">
        {orderedBids.length > 0 ? (
          orderedBids.map((bid, i) => {
            const bidTeam = teams?.find((team) => team.id === bid.teamId);
            const bidMembers = members.filter((member) => member.teamId === bidTeam?.id);
            return (
              <div
                id={`bid${i}`}
                className={clsx(
                  'flex flex-row items-center justify-between border-2 rounded-xl p-6 gap-6',
                  i === 0 && !(bid.teamId === teamId)
                    ? 'border-success-light text-success-light'
                    : bid.teamId === teamId
                    ? 'border-bravo text-bravo'
                    : 'text-alpha-light-800 border-alpha-light-800'
                )}
                key={bid.id}
              >
                <div>
                  <p className="text-2xl font-bold">{bidTeam?.name}</p>
                  {bidMembers && getTeamMemberString(bidMembers)}
                </div>
                <p className="font-semibold text-3xl">${bid.amount}m</p>
              </div>
            );
          })
        ) : (
          <div id="bid0" className="w-full border-2 border-dashed border-alpha-highlight-light rounded-md p-6">
            <p className="text-2xl font-semibold text-alpha-highlight-light">Reserve not yet met</p>
            <p className="text-alpha-highlight-light">No team has bid on this company</p>
          </div>
        )}
      </div>
    </div>
  );
};
