export const isRequired = value => !value && 'This field is required';

export const isNumber = value =>
  isNaN(Number(value)) && 'The field must be a number';

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined;

export const matchInput = (input, allInputs) =>
  input === allInputs.password ? undefined : 'Passwords do not match';

export const toNumber = value => value && Number(value);

export const upper = value => value && value.toUpperCase();

export const onlyNumbers = value =>
  value ? (value.match(/\d+/g) || []).join('') : '';

export const usaPhoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;
