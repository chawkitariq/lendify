import { inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { ItemService } from '../item/item.service';
import { catchError, map, Observable, of } from 'rxjs';

export function itemTitleExistsValidator(): AsyncValidatorFn {
  const itemService = inject(ItemService);

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return itemService.findByTitle(control.value).pipe(
      map(({ data }) => (data?.length ? { itemTitleExists: true } : null)),
      catchError(() => of(null))
    );
  };
}
// export function itemTitleExistsValidator(
