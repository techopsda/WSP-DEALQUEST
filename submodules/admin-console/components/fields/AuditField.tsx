import { BoltIcon, PencilIcon } from '@heroicons/react/24/outline';
import { formatDateTime } from '../../lib/formatDateTime';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface AuditFieldProps {
  record: { createdById: string; modifiedById: string; createdAt: string; modifiedAt: string };
}

export const AuditField: React.FC<AuditFieldProps> = ({ record }) => {
  const createdAt = record['createdAt'];
  const modifiedAt = record['modifiedAt'];
  const createdBy = record['createdById'];
  const modifiedBy = record['modifiedById'];

  const createdTooltipText = `Created At: ${createdAt ? formatDateTime(createdAt) : 'N/A'} by ${createdBy ?? 'N/A'}`;
  const modifiedTooltipText = `Modified At: ${modifiedAt ? formatDateTime(modifiedAt) : 'N/A'} by ${
    modifiedBy ?? 'N/A'
  }`;

  return (
    <div className="flex">
      <BoltIcon
        data-tooltip-id="createdAt"
        data-tooltip-content={createdTooltipText}
        data-tooltip-place="right"
        className="h-5 w-5 text-nsAdmin-600 mr-2"
      />
      <PencilIcon
        data-tooltip-id="modifiedAt"
        data-tooltip-content={modifiedTooltipText}
        className="h-5 w-5 text-nsAdmin-600"
        data-tooltip-place="bottom"
      />
      <Tooltip id="createdAt" className="bg-nsAdmin-600" />
      <Tooltip id="modifiedAt" className="bg-nsAdmin-600" />
    </div>
  );
};
