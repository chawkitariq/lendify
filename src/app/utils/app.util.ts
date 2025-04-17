import { AbstractControl } from '@angular/forms';

export function isInvalidControl(control: AbstractControl) {
  return control.invalid && (control.dirty || control.touched);
}
