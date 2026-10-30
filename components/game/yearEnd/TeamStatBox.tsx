import clsx from 'clsx';
import { ChevronsUp } from 'lucide-react';
import { Counter } from '../Counter';

interface Props {
  statName: string;
  teamName: string | null;
  positive?: boolean;
  from: number;
  to: number;
  valueDown?: boolean;
}

export const TeamStatBox: React.FC<Props> = ({ statName, teamName, positive, valueDown, from, to }) => {
  return (
    <div className="bg-alpha-800 rounded-xl overflow-hidden">
      <div className="bg-alpha-950 px-6 py-3 flex items-center justify-between gap-6">
        <p className="">
          {teamName && (
            <>
              <span className="text-bravo">{teamName}</span> {statName}
            </>
          )}
        </p>
        <ChevronsUp
          className={clsx(
            '[ animate-chevron ] w-6 h-6 shrink-0',
            positive && positive ? 'text-success-light' : 'text-error-light',
            valueDown && 'rotate-180'
          )}
        />
      </div>
      <p className="p-6 font-semibold text-white text-[2.5rem]">
        $<Counter from={from} to={to} decimals={1} duration={1} />m
      </p>
    </div>
  );
};
