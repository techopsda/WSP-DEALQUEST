import clsx from 'clsx';
import { Field } from 'react-final-form';

interface InviteUserToProjectFieldProps {
  name: string;
  title: string;
  placeholder: string;
}

export const InviteUserToProjectField: React.FC<InviteUserToProjectFieldProps> = ({ name, title, placeholder }) => {
  return (
    <Field
      name={name}
      render={({ input, meta }) => {
        const failedValidation = meta.error !== undefined && meta.submitFailed && !meta.modifiedSinceLastSubmit;

        return (
          <div className="flex flex-col gap-1">
            <label htmlFor={input.name} className="flex flex-row justify-between">
              <div>{title}</div>
            </label>
            <div className="relative">
              <input
                id={input.name}
                placeholder={placeholder}
                className={clsx({
                  'w-full rounded-md border p-3 disabled:bg-gray-100': true,
                  'border-[#6a2f2b]': failedValidation
                })}
                {...input}
              />
            </div>
            {failedValidation && <p className="text-sm text-[#6a2f2b]">{meta.error}</p>}
          </div>
        );
      }}
    />
  );
};
