import { bidStatus } from '@/types/BidStatusEnum';
import { Bid } from '@/types/database';
import _ from 'lodash';

export const getBidStatus = (realtimeBidsFiltered: Bid[], teamId: string, teamIsOut: boolean) => {
  const lastBidTeamId = _.maxBy(realtimeBidsFiltered, (bid) => new Date((bid as any).createdAt))?.teamId;
  const allBidsTeamIds = realtimeBidsFiltered.map((bid) => bid.teamId);

  if (!teamIsOut) {
    if (lastBidTeamId !== teamId && allBidsTeamIds.includes(teamId)) {
      return bidStatus.outbid;
    } else if (lastBidTeamId === teamId) {
      return bidStatus.winning;
    } else if (allBidsTeamIds.length < 1 || !allBidsTeamIds.includes(teamId)) {
      return bidStatus.open;
    }
  }

  return bidStatus.out;
};
