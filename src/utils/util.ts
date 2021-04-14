import { ValidationError } from 'class-validator';

export const isEmpty = (value: any): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const createValidationErrorMessage = (errors: ValidationError[]): string => {
  return errors
    .map((error: ValidationError) => {
      if (error.children?.[0]) return createValidationErrorMessage(error.children);
      if (error.constraints) return Object.values(error.constraints);
      return;
    })
    .join(', ');
};
