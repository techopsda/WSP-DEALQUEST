import clsx from 'clsx';

interface Props {
  id: string;
  label: string;
  showResults: boolean;
  value?: number;
  correctValue: number;
  onInputChange: (newValue: string) => void;
  isPracticeOnly: boolean;
  isPracticeRound: boolean;
  gameYear: number;
}

export const AccountingInput: React.FC<Props> = ({
  id,
  label,
  showResults,
  value,
  correctValue,
  onInputChange,
  isPracticeOnly,
  isPracticeRound,
  gameYear
}) => {
  const correct = correctValue === value;
  const showResultsStyling = gameYear === 0 || !isPracticeOnly;

  const input = document.getElementById(id);
  input?.addEventListener(
    'wheel',
    (event) => {
      if ((document?.activeElement as any)?.type === 'number') event.preventDefault();
    },
    { passive: false }
  );

  return (
    <div id={id} className="grid grid-cols-5 items-center gap-6 px-6 py-4">
      <label className="col-span-2" htmlFor={id}>
        {label}
      </label>
      <div className={clsx('col-span-3 grid gap-6', showResults ? 'grid-cols-2' : 'grid-cols-1')}>
        <div className="relative bg-alpha rounded-lg">
          {!(!isPracticeRound && isPracticeOnly) && (
            <p className="absolute top-1/2 left-0 -translate-y-1/2 translate-x-3">$</p>
          )}
          <input
            className={clsx(
              'w-full  py-3 px-8 text-right font-semibold text-white rounded-lg appearance-none',
              'placeholder:text-alpha-300 placeholder:font-normal',
              !isPracticeRound && isPracticeOnly ? 'bg-gray-800' : 'bg-transparent'
            )}
            id={id}
            type="number"
            placeholder={showResults || (!isPracticeRound && isPracticeOnly) ? '' : 'Enter value'}
            disabled={showResults || (!isPracticeRound && isPracticeOnly)}
            value={value?.toString() ?? ''}
            onChange={(e) => onInputChange(e.target.value)}
          />
          {!(!isPracticeRound && isPracticeOnly) && (
            <p className="absolute top-1/2 right-0 -translate-y-1/2 -translate-x-3">m</p>
          )}
        </div>
        {showResults && (
          <div
            className={clsx(
              'relative bg-alpha rounded-lg border',
              showResultsStyling && correct && 'border-success-light',
              showResultsStyling && !correct && 'border-error-light',
              !showResultsStyling && 'border-alpha'
            )}
          >
            <p className="absolute top-1/2 left-0 -translate-y-1/2 translate-x-3">$</p>
            <input
              className={clsx(
                'w-full bg-transparent py-3 px-8 text-right font-semibold rounded-lg appearance-none',
                'placeholder:text-alpha-300 placeholder:font-normal',
                showResultsStyling && correct && 'text-success-light',
                showResultsStyling && !correct && 'text-error-light',
                !showResultsStyling && 'text-white'
              )}
              id={id}
              type="number"
              value={correctValue}
              disabled={showResults}
            />
            <p className="absolute top-1/2 right-0 -translate-y-1/2 -translate-x-3">m</p>
          </div>
        )}
      </div>
    </div>
  );
};
