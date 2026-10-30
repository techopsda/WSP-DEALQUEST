import { MutableRefObject } from 'react';
import { LobbyInput } from './LobbyInput';
import { Ring } from '@uiball/loaders';

interface LobbyFormProps {
  title: string;
  text: string;
  subtext?: string;
  inputValue?: any; // not sure what this should be
  inputOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputPlaceholder: string;
  buttonText: string;
  buttonOnClick: () => void;
  buttonDisabled?: boolean;
  warningMessage?: string;
  allowEnterPress?: boolean;
  inputRefs?: MutableRefObject<HTMLInputElement[]>;
  isLoading?: boolean;
}

export const LobbyForm: React.FC<LobbyFormProps> = ({
  title,
  text,
  subtext,
  inputValue,
  inputPlaceholder,
  buttonText,
  buttonOnClick,
  buttonDisabled = false,
  warningMessage,
  inputOnChange,
  allowEnterPress,
  inputRefs,
  isLoading
}) => {
  return (
    // Should use a form tag
    <div className="flex flex-col gap-9 text-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-white font-heading leading-snug text-5xl">{title}</h1>
        <p className="text-lg">{text}</p>
        {subtext && <p className="text-white font-bold">{subtext}</p>}
      </div>
      <div className="flex flex-col gap-6">
        <LobbyInput
          value={inputValue}
          placeholder={inputPlaceholder}
          type="text"
          onChange={inputOnChange}
          onEnterPressed={buttonOnClick}
          allowEnterPress={allowEnterPress}
          inputRefs={inputRefs}
          required
        />
        <div>
          <button className="[ dqButton ]" onClick={buttonOnClick} disabled={buttonDisabled}>
            {isLoading ? <Ring size={20} color="#222430" /> : <span>{buttonText} </span>}
          </button>
        </div>
        {warningMessage && (
          <span className="bg-error text-white p-6 flex justify-center  rounded-md">{warningMessage}</span>
        )}
      </div>
    </div>
  );
};
