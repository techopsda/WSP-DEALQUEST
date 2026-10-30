import { RegisterFormValues } from './useRegisterSubmit';
import { size } from 'lodash';

export const validateRegisterForm = (formValues: Partial<RegisterFormValues>) => {
  const errors: Partial<RegisterFormValues> = {};

  if (!formValues.firstName) {
    errors['firstName'] = 'First name is required';
  }

  if (!formValues.lastName) {
    errors['lastName'] = 'Last name is required';
  }

  if (!formValues.email) {
    errors['email'] = 'Email is required';
  }

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
