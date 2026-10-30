import { LocalEvent } from '@/types/database';
import { Card } from './Card';
import FestivalImage from '../../../public/card-illustrations/festival.svg';
import BadNewsImage from '../../../public/card-illustrations/badnews.svg';
import clsx from 'clsx';

interface LocalEventSummaryProps {
  localEvent: LocalEvent;
  localEventAmount: number;
}

export const LocalEventSummary: React.FC<LocalEventSummaryProps> = ({ localEvent, localEventAmount }) => {
  return (
    <div className="w-full flex flex-row items-center justify-center gap-12">
      <div className="max-w-[10rem] lg:max-w-xs w-full">
        <Card
          title={localEvent?.name}
          text={localEvent?.description}
          type={localEvent?.type}
          image={localEvent?.type === 'negative' ? BadNewsImage?.src : FestivalImage?.src}
          flipped={true}
          localEventAmount={localEventAmount}
        />
      </div>
      <div className="">
        {localEvent?.type === 'positive' && (
          <>
            <p>You chose wisely</p>
            <p className="font-semibold text-white text-3xl">{localEvent.name}</p>
          </>
        )}
        {localEvent?.type === 'negative' && (
          <>
            <p>Next Time</p>
            <p className="font-semibold text-white text-3xl">{localEvent.name}</p>
          </>
        )}
        <p
          className={clsx(
            'font-semibold text-3xl',
            localEvent?.type === 'positive' ? 'text-success-light' : 'text-error-light'
          )}
        >
          {localEvent?.type === 'positive' ? `+$${localEventAmount}m Income` : `-$${localEventAmount}m Income`}
        </p>
      </div>
    </div>
  );
};
