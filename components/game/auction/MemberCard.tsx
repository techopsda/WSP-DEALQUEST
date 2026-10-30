import { Member } from '@/types/database';

interface Props {
  members: Member[];
}

export const MemberCard: React.FC<Props> = ({ members }) => {
  return <>{members ? members.map((member) => member?.name) : <p>Loading Members...</p>}</>;
};
