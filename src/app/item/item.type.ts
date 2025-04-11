import { FormControl } from '@angular/forms';

export type Item = {
  id: number;
  title: string;
  description: string;
  returnAt: Date;
  realReturnAt: Date;
};

export type ItemCreatePayload = {
  title: string;
  description?: string;
  returnAt?: Date;
};

export type ItemUpdatePayload = Partial<ItemCreatePayload>;

export type ToFormGroup<T> = {
  [K in keyof T]-?: FormControl<T[K]>;
};

type d = ToFormGroup<ItemCreatePayload>;

export type ApiResponse<T> = {
  data: T;
};
