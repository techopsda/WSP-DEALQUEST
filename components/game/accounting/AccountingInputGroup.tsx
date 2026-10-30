import { AccountingField } from '@/types/AccountingField';
import { Game } from '@/types/database';
import clsx from 'clsx';
import _ from 'lodash';
import { AccountingInput } from './AccountingInput';

interface Props {
  game: Game;
  title: string;
  footerFields: AccountingField[];
  additionalFields?: AccountingField[];
  submitted?: boolean;
  fields: AccountingField[];
  isPracticeRound: boolean;
  isGroupCorrect: boolean;
  handleInputChange?: (fieldId: string, newValue: string) => void;
}

export const AccountingInputGroup: React.FC<Props> = ({
  game,
  title,
  footerFields,
  submitted,
  additionalFields,
  fields,
  isPracticeRound,
  isGroupCorrect,
  handleInputChange
}) => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <h2 className="text-center font-medium text-white text-2xl">{title}</h2>
        <div id={`${_.startCase(title)}Audit`.replaceAll(' ', '')} className="bg-alpha-800 rounded-xl overflow-hidden">
          {fields.map((input) => (
            <AccountingInput
              key={input.id}
              id={input.id}
              label={input.label}
              showResults={game.periodType === 'accountingResults'}
              value={input.value}
              correctValue={input.correctValue}
              onInputChange={(newValue: string) => handleInputChange && handleInputChange(input.id, newValue)}
              isPracticeOnly={input.practiceOnly}
              isPracticeRound={isPracticeRound}
              gameYear={game.year}
            />
          ))}

          {additionalFields && (
            <>
              {additionalFields.map((input) => (
                <AccountingInput
                  key={input.id}
                  id={input.id}
                  label={input.label}
                  showResults={game.periodType === 'accountingResults'}
                  value={input.value}
                  correctValue={input.correctValue}
                  onInputChange={(newValue: string) => handleInputChange && handleInputChange(input.id, newValue)}
                  isPracticeOnly={input.practiceOnly}
                  isPracticeRound={isPracticeRound}
                  gameYear={game.year}
                />
              ))}
            </>
          )}
          <hr className="border-alpha" />
          {footerFields.map((input) => (
            <AccountingInput
              key={input.id}
              id={input.id}
              label={input.label}
              showResults={game.periodType === 'accountingResults'}
              value={input.value}
              correctValue={input.correctValue}
              onInputChange={(newValue: string) => handleInputChange && handleInputChange(input.id, newValue)}
              isPracticeOnly={input.practiceOnly}
              isPracticeRound={isPracticeRound}
              gameYear={game.year}
            />
          ))}
          {submitted && (
            <div
              className={clsx(
                'p-6 text-white font-semibold flex items-center justify-between gap-6',
                game.periodType === 'accountingResults' && !submitted && 'opacity-0',
                game.periodType === 'accountingResults' && submitted && 'animation-fadeIn',
                isGroupCorrect ? 'bg-success-dark' : 'bg-error'
              )}
            >
              <p>{isGroupCorrect ? 'Audit successful' : 'Audit unsuccessful'}</p>
              {isGroupCorrect && <p>+$5m beancounter funding</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
