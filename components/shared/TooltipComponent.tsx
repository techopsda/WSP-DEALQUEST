import { X } from 'lucide-react';
import { TooltipRenderProps } from 'react-joyride';

export const TooltipComponent: React.FC<TooltipRenderProps> = ({
  tooltipProps,
  skipProps,
  step,
  backProps,
  primaryProps,
  isLastStep
}) => {
  return (
    <div
      className="max-w-md bg-alpha-light-200 relative rounded-md px-6 pb-6 pt-12 flex flex-col gap-6"
      {...tooltipProps}
    >
      <button {...skipProps} className="absolute top-2 right-2">
        <X className="text-alpha-900" />
      </button>
      <span className="text-lg text-alpha-900">{step.content}</span>
      <div className="flex justify-between items-center w-full border-t border-alpha-light-900 pt-6">
        <button className="text-white font-semibold bg-error rounded-md px-5 py-2" {...backProps}>
          BACK
        </button>
        <button className="text-white font-semibold bg-success-dark rounded-md px-5 py-2" {...primaryProps}>
          {isLastStep ? 'FINISH' : 'NEXT'}
        </button>
      </div>
    </div>
  );
};
