import { PublicFieldProps, useRecordContext } from 'react-admin';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { MouseEventHandler } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export const IDField = ({ source }: PublicFieldProps) => {
  const record = useRecordContext();
  const ID = record && source && record[source];

  const copyID: MouseEventHandler<SVGSVGElement> | undefined = () => {
    navigator.clipboard.writeText(ID);
  };

  return (
    <div>
      <InformationCircleIcon
        data-tooltip-id="id"
        data-tooltip-content={ID}
        data-tooltip-place="right"
        className="h-5 w-5 text-nsAdmin-600"
        onClick={copyID}
      />
      <Tooltip id="id" className="bg-nsAdmin-600" />
    </div>
  );
};
