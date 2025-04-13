import { HttpEvent, HttpEventType, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

/**
 * Angular HTTP interceptor that automatically converts date strings to Date objects
 * in HTTP response bodies, regardless of nesting level.
 */
export const dateInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event: HttpEvent<unknown>) => {
      // Only process HttpResponse events that contain a body
      if (event.type === HttpEventType.Response) {
        // We need to cast to HttpResponse to access the body property
        const response = event as HttpResponse<unknown>;
        
        // Create a new response with the transformed body
        return response.clone({
          body: deepParseDates(response.body)
        });
      }
      
      // Return all other event types unchanged
      return event;
    })
  );
};

/**
 * Regular expression for ISO 8601 date string
 * This matches formats like:
 * - 2023-04-13T15:30:45Z
 * - 2023-04-13T15:30:45.123Z
 * - 2023-04-13
 */
const ISO_DATE_REGEX = /^(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})?)?$/;

/**
 * Recursively transforms all date strings to Date objects in any value (primitive, object, or array)
 * @param value Any value that might contain date strings
 * @returns The transformed value with date strings converted to Date objects
 */
function deepParseDates(value: unknown): unknown {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return value;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return value.map(item => deepParseDates(item));
  }

  // Handle objects (but not Date objects)
  if (typeof value === 'object' && !(value instanceof Date)) {
    const result: Record<string, unknown> = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = deepParseDates((value as Record<string, unknown>)[key]);
      }
    }
    return result;
  }

  // Handle potential date strings
  if (typeof value === 'string' && ISO_DATE_REGEX.test(value)) {
    const parsedDate = new Date(value);
    // Validate that parsing produced a valid date
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }

  // Return unchanged for all other types
  return value;
}