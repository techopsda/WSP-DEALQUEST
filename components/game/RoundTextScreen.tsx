import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface Props {
  title?: string | React.ReactNode;
  isIntro?: boolean;
  id?: string;
}

export const RoundTextScreen: React.FC<PropsWithChildren<Props>> = ({ title, isIntro = false, children, id }) => {
  return (
    <div id={id} className="flex flex-col items-center gap-3">
      {title && (
        <h1
          className={clsx(
            'text-white font-bold text-center max-w-3xl text-3xl lg:text-5xl leading-tight',
            isIntro && 'font-heading'
          )}
        >
          {title}
        </h1>
      )}
      {children && (
        <div
          className={clsx(
            'flex flex-col items-center gap-9 text-center max-w-4xl',
            isIntro ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl'
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
