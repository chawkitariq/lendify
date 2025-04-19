import { FormControl } from '@angular/forms';

export type ToFormGroup<T> = {
  [K in keyof T]-?: FormControl<T[K]>;
};

export type ApiErrorResponse = {
  errors: {
    message: string;
    extension: { code: string };
  }[];
};

export type HttpClientErrorResponse<T> = {
  error: T;
};

export type ApiResponse<T> = {
  data: T;
};
