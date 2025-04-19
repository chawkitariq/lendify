import { ApiErrorResponse } from '../app.type';

/**
 * Extracts the error messages from an ApiErrorResponse.
 * @param error The ApiErrorResponse object.
 * @returns An array of error messages.
 */
export function extractApiErrorMessages(error: ApiErrorResponse): string[] {
  return error.errors.map((err) => err.message);
}

/**
 * Extracts the error message from an ApiErrorResponse.
 * @param error The ApiErrorResponse object.
 * @returns A string containing the error messages, joined by commas.
 */
export function extractApiErrorMessage(error: ApiErrorResponse): string {
  return extractApiErrorMessages(error).join(', ');
}
