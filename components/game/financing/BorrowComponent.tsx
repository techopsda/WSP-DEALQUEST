import { Game, RefButtonType } from '@/types/database';
import clsx from 'clsx';
import { forwardRef } from 'react';

interface BorrowComponentProps {
  borrowValue: number | 0;
  setBorrowValue: (borrowedValue: number) => void;
  isPracticeRound: boolean;
  game: Game;
}

export const BorrowComponent: React.FC<BorrowComponentProps> = forwardRef(
  ({ borrowValue, setBorrowValue, isPracticeRound, game }, ref) => {
    const checkIsDisabled = (val: number) => isPracticeRound && (val === 0 || val === 50);
    const values = [0, 20, 50];
    return (
      <>
        {game.year !== 5 ? (
          <>
            <div className="flex items-center flex-col gap-3">
              <h1 id="financePrimaryHeader" className="text-3xl text-white font-bold text-center">
                How much would you like to borrow this year?
              </h1>
              <p className="text-xl">Select the amount you would like to borrow this year</p>
            </div>
            <div className="flex flex-row gap-6 justify-center">
              {values.map((val, index) => {
                const isDisabled = checkIsDisabled(val);
                return (
                  <div
                    className={clsx([
                      'w-full h-full rounded-xl border-[3px] duration-150',
                      isDisabled && 'bg-gray-800 border-none',
                      val === borrowValue && !isDisabled && 'bg-success-dark text-white border-success-light',
                      val !== borrowValue && !isDisabled && 'bg-alpha-light-100 text-alpha border-alpha-light-100'
                    ])}
                    key={val}
                  >
                    <button
                      id={`borrowingComponent${index}`}
                      className={clsx(
                        'w-72 h-56 text-4xl font-semibold flex items-center justify-center',
                        isDisabled ? 'text-gray-500' : val === borrowValue ? 'text-white' : 'text-alpha'
                      )}
                      onClick={() => setBorrowValue(val)}
                      disabled={isDisabled}
                      ref={ref as RefButtonType}
                    >
                      ${val}m
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col bg-error text-xl text-center space-y-4 px-4 py-8 font-semibold text-white w-3/6">
            <p>
              Due to last year&apos;s event regulators have cracked down on borrowing. You must reduce your debt to
              $100m or less. You can do this using your cash, or by selling companies to raise cash and repay debt
            </p>
            <p>Failure to comply will result in a restructuring company taking $300m of your equity.</p>
            <p>Use the new buttons above to sell companies &#40;if you need to raise cash&#41; or pay debt.</p>
          </div>
        )}
      </>
    );
  }
);
