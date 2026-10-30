import { JobTitle, MemberWithJobTitle } from '@/types/database';
import { Trash2 } from 'lucide-react';
import { MutableRefObject } from 'react';
import { LobbyInput } from '../lobby/LobbyInput';

interface IEditMemberButton {
  index: number;
  member: MemberWithJobTitle;
  handleUpdateMembers: (member: MemberWithJobTitle) => void;
  randomUnusedJobTitle?: JobTitle;
  handleDeleteMember: (index: number) => void;
  onMembersSubmit: (index: number) => void;
  maxMembersPerTeam: number;
  inputRefs?: MutableRefObject<HTMLInputElement[]>;
}

const EditMemberButton: React.FC<IEditMemberButton> = ({
  member,
  handleUpdateMembers,
  handleDeleteMember,
  index,
  randomUnusedJobTitle,
  onMembersSubmit,
  maxMembersPerTeam,
  inputRefs
}) => {
  const allowEnterPress = index + 1 < maxMembersPerTeam;

  return (
    <div key={member.id} className="flex gap-6 bg-alpha-900 p-6 border-2 border-alpha-highlight-dark rounded-xl">
      <div className="relative w-full max-w-[25rem]" id={`teamMemberName-${index}`}>
        <LobbyInput
          type="text"
          placeholder="Enter team member name"
          fontSize="text-2xl"
          padding="py-4 px-6"
          align="text-left"
          value={member.name}
          onChange={(e) => handleUpdateMembers({ ...member, name: e.target.value })}
          onEnterPressed={() => randomUnusedJobTitle && onMembersSubmit(index)}
          inputKey={`editMember-${member.id}`}
          onBlur={() => {
            if (member.name && !member.jobTitle && randomUnusedJobTitle)
              handleUpdateMembers({ ...member, jobTitle: randomUnusedJobTitle, jobTitleId: randomUnusedJobTitle?.id });
            else if (!member.name && member.jobTitle)
              handleUpdateMembers({ ...member, jobTitle: null, jobTitleId: '' });
          }}
          allowEnterPress={allowEnterPress}
          index={index}
          inputRefs={inputRefs}
        />
      </div>

      <p className="shrink-0 grow text-alpha-light-700 font-heading text-2xl font-semibold flex items-center">
        {member?.jobTitle && member?.jobTitle.name}
      </p>

      <button
        disabled={index === 0}
        className={`relative ${
          index === 0 ? 'bg-gray-500' : ''
        } bg-error rounded-md h-[4.5rem] aspect-square | focus:outline-2 focus:outline-error focus:outline-offset-4 text-alpha-900`}
        onClick={() => handleDeleteMember(index)}
        id={`teamMemberDelete-${index}`}
      >
        <Trash2
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 text-white"
          strokeWidth={1.5}
        />
      </button>
    </div>
  );
};

export default EditMemberButton;
