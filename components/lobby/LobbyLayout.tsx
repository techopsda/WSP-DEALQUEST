import { PropsWithChildren } from 'react';
import LogoGroup from './LogoGroup';

interface Props {
  includeLogo?: boolean;
  includeCopy?: boolean;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export const LobbyLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
  includeLogo = false,
  includeCopy = false,
  maxWidth = 'max-w-xl',
  footer
}) => {
  return (
    <div className="relative grow flex flex-col justify-between items-center gap-24">
      {includeLogo && <LogoGroup />}
      <div className={`grow flex flex-col items justify-center gap-6 w-full ${maxWidth}`}>{children}</div>
      {footer && (
        <div className="flex flex-col gap-9 justify-center">
          {footer}
          {includeCopy && (
            <p className="text-center text-alpha-light-800 text-sm">
              IBHero.com trading as Financial Edge Training.
              <br />
              Copyright {new Date().getFullYear()}. All Rights Reserved
            </p>
          )}
        </div>
      )}
    </div>
  );
};
