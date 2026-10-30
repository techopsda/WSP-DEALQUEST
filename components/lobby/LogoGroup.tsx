import DealQuestLogo from '../shared/DealQuestLogo';
import FELogo from '../shared/FELogo';

export interface Props {
  align?: string;
  feHeight?: string;
  dqHeight?: string;
  gap?: string;
}

export const LogoGroup: React.FC<Props> = ({
  align = 'items-center',
  feHeight = 'max-h-6',
  dqHeight = 'max-h-12',
  gap = 'gap-6'
}) => {
  return (
    <div className={`w-full flex flex-col ${align} ${gap}`}>
      <FELogo className={`text-alpha-light-800 w-auto ${feHeight}`} />
      <DealQuestLogo className={`w-auto ${dqHeight}`} />
    </div>
  );
};

export default LogoGroup;
