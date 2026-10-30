import clsx from 'clsx';
import { HTMLInputTypeAttribute, KeyboardEvent, MutableRefObject } from 'react';

interface Props {
  value: any; // not sure what this should be
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  padding?: string;
  fontSize?: string;
  type: HTMLInputTypeAttribute;
  align?: string;
  inputKey?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onEnterPressed?: () => void;
  allowEnterPress?: boolean;
  index?: number; //to use on team members to target the next input
  inputRefs?: MutableRefObject<HTMLInputElement[]>;
}

export const LobbyInput: React.FC<Props> = ({
  value,
  placeholder,
  onChange,
  required,
  type,
  padding,
  fontSize,
  align,
  inputKey,
  onBlur,
  onEnterPressed,
  allowEnterPress,
  index,
  inputRefs
}) => {
  const onKeyPressed = (event: KeyboardEvent<HTMLInputElement>, index?: number) => {
    if (event.key === 'Enter') {
      if (allowEnterPress && onEnterPressed) {
        onEnterPressed();
      }
    }
  };

  return (
    <input
      key={inputKey}
      value={value}
      ref={(ref: HTMLInputElement) => inputRefs && index && (inputRefs.current[index] = ref)}
      className={clsx(
        'w-full bg-alpha-light-200 rounded-md placeholder:text-alpha-light-800 duration-150 | focus:outline-2 focus:outline-alpha-highlight-light focus:outline-offset-4 text-alpha-900',
        padding ? padding : 'py-6 px-9',
        fontSize ? fontSize : 'text-2xl',
        align ? align : 'text-center'
      )}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      onKeyDown={(e) => onKeyPressed(e, index)}
      required={required}
      onBlur={onBlur}
    />
  );
};
