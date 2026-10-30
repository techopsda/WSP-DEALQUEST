import { UpdatePasswordFormValues } from './useUpdatePasswordSubmit';
import { size } from 'lodash';

export const validatePasswordUpdateForm = (formValues: Partial<UpdatePasswordFormValues>) => {
  const errors: Partial<UpdatePasswordFormValues> = {};

  if (size(formValues.password) < 6) {
    errors['password'] = 'Password must be at least 6 characters long';
  }

  if (!formValues.passwordConfirmation) {
    errors['passwordConfirmation'] = 'Password confirmation is required';
  }

  if (formValues.password !== formValues.passwordConfirmation) {
    errors['passwordConfirmation'] = 'Passwords do not match';
  }

  return errors;
};
