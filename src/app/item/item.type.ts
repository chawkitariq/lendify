import { FormControl } from "@angular/forms";

export type Item = {
  id: number
  title: string;
  description: string;
  returnAt: Date;
  realReturnAt: Date;
  };

  export type ItemCreatePayload = {
    title: string
    description?: string
    returnAt?: string
  }

  export type ToFormControl<T> = {
    [K in keyof T]-?: FormControl<T[K]>
  };

  type d = ToFormControl<ItemCreatePayload>


export type ApiResponse<T> = {
  data: T;
};
