import { AbstractControl } from '@angular/forms';
import { environment } from '../../environments/environment';

export function isInvalidControl(control: AbstractControl) {
  return control.invalid && (control.dirty || control.touched);
}

export function constructAssetUrl(asset = '') {
  return `${environment.apiAssetsUrl}/${asset}`;
}
