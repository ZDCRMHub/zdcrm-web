import { type AxiosError } from 'axios';
import { FieldValues, UseFormSetError } from 'react-hook-form';

import { isStringOrArrayOfStrings } from './strings';

/**
 * Formats an object containing errors into a string.
 * The errors/exceptions are usually formatted by Django Rest Framework.
 * https://www.django-rest-framework.org/api-guide/exceptions/#exception-handling-in-rest-framework-views
 *
 * @param errors - An object containing errors, where the keys are (often) field names and the values are error messages.
 * @returns A single string representing the formatted error message that includes all the messages in the initial object.
 */
export function formatErrorObject(errors: {
  [key: string]: string | string[];
}): string {
  const namedErrors: string[] = [];
  const otherErrors: string[] = [];

  // List out error keys that are usually not associated with input fields.
  const otherErrorKeys = [
    'non-field-errors',
    'nonFieldErrors',
    'detail',
    'message',
  ];

  // Process named errors.
  for (const [key, value] of Object.entries(errors)) {
    if (!value && !isStringOrArrayOfStrings(value)) {
      continue;
    }

    if (!otherErrorKeys.includes(key) && value?.length) {
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

      if (Array.isArray(value) && value.length) {
        namedErrors.push(`${formattedKey}: ${value.join(', ')}`);
      }
    }
  }

  // Process non-named errors.
  for (const key of otherErrorKeys) {
    const value = errors[key];

    if (!value && !isStringOrArrayOfStrings(value)) {
      continue;
    }

    if (typeof value === 'string') {
      otherErrors.push(value);
    } else if (Array.isArray(value) && value.length) {
      otherErrors.push(value.join('. '));
    }
  }

  // Combine named and non-named errors.
  const result: string[] = [...namedErrors];
  if (otherErrors.length) {
    result.push(
      `${namedErrors.length > 1 ? 'Other errors: ' : ''}${otherErrors.join(
        '. '
      )}`
    );
  }

  // Remove trailing full stops except the last item.
  for (let i = 0; i < result.length - 1; i++) {
    result[i] = result[i].replace(/\.$/, '');
  }

  return result.join('. ');
}

/**
 * @param error An axios error instance. Usually returned by React Query and a Django backend.
 * @returns The error message formatted for the UI. Contents of an array are merged into a single string.
 */
export function formatAxiosErrorMessage(
  // Typed as any because errors from server do not have a consistent shape.
  error: AxiosError<any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  const firstDigitInResponseStatus = String(error.response?.status).charAt(0);

  if (firstDigitInResponseStatus === '5') {
    return 'There was an error processing that. Please contact support.'; // Generic errors for server errors.
  }

  // Return default error message string if user is not connected to the internet.
  if (error.code === 'ERR_NETWORK') {
    return `${error.message}. Please check your internet connection.`;
  }

  // Log the error response for debugging purposes.
  console.error('Axios error response:', error.response);

  // Check if the error response has the expected structure.
  if (error.response?.data && typeof error.response.data === 'object') {
    // Check if the error response contains an 'errors' object.
    if (error.response.data.errors && typeof error.response.data.errors === 'object') {
      return formatErrorObject(error.response.data.errors);
    }
    // Fallback to the main data object if 'errors' is not present.
    return formatErrorObject(error.response.data);
  }

  // Fallback to a generic error message if the structure is not as expected.
  return 'An unexpected error occurred. Please try again later.';
}



type ErrorResponse = {
    status: string;
    status_code: number | null;
    data: any | null;
    errors: {
        [key: string]: string[];
    };
    customMessages?: {
      [key: string]: string;
  };
};


export const setFormErrors = (
  errors: ErrorResponse['errors'],
  customMessages: ErrorResponse['customMessages'],
  setError: UseFormSetError<FieldValues>
) => {
  Object.keys(errors).forEach((fieldName) => {
      const fieldError = errors[fieldName].join(' ');
      console.log(fieldName)
      console.log(fieldError)
      const errorMessage = customMessages?.[fieldName] || fieldError;
      setError(fieldName, {
          type: 'manual',
          message: errorMessage,
      });
  });
};



interface ErrorResponse2 {
  error?: {
    summary?: string;
    fields?: {
      [key: string]: string[];
    };
  };
}

/**
 * Extracts error messages from a specific error format.
 * @param error - The error object to extract messages from.
 * @returns A string containing all error messages, or null if no errors found.
 */
export function extractErrorMessage(error: unknown): string {
  // Type guard to ensure error is of the correct shape
  if (typeof error !== 'object' || error === null) {
    return "An unexpected error occurred. Please try again later.";
  }

  const errorObj = error as ErrorResponse2;

  if (!errorObj.error || !errorObj.error.fields) {
    return "An unexpected error occurred. Please try again later.";
  }

  const { fields } = errorObj.error;
  const errorMessages: string[] = [];

  // Iterate through all field errors
  for (const [field, messages] of Object.entries(fields)) {
    if (Array.isArray(messages) && messages.length > 0) {
      errorMessages.push(`${field}: ${messages.join(', ')}`);
    }
  }

  // If there's a summary, add it to the beginning of the error messages
  if (errorObj.error.summary) {
    errorMessages.unshift(errorObj.error.summary);
  }

  return errorMessages.length > 0 ? errorMessages.join('. ') : "An unexpected error occurred. Please try again later.";
}