import _ from 'lodash';
import { PlusCircle } from 'lucide-react';

interface IAddNewMemberButton {
  onAddMember: (index: number) => void;
  prevIndex: number;
}

const AddNewMemberButton: React.FC<IAddNewMemberButton> = ({ onAddMember, prevIndex }) => {
  return (
    <button
      className="flex items-center gap-6 bg-transparent p-6 border-2 border-dashed border-alpha-highlight-dark rounded-xl min-h-[7.9rem] duration-300 | hover:bg-alpha-700"
      onClick={() => onAddMember(prevIndex)}
      id="teamAddNewMember"
    >
      <div className="flex items-center gap-3 text-2xl">
        <div className="relative bg-transparent rounded-md aspect-square w-9 h-9">
          <PlusCircle
            className={`text-alpha-light-400 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9`}
          />
        </div>
        <p className="font-semibold">Add new team member</p>
      </div>
    </button>
  );
};

export default AddNewMemberButton;
