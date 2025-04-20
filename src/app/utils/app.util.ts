import { AbstractControl } from '@angular/forms';
import { environment } from '../../environments/environment';

/**
 * Checks if a form control is invalid.
 * @param control - The form control to check
 * @returns {boolean} - True if the control is invalid, false otherwise.
 */
export function isInvalidControl(control: AbstractControl) {
  return control.invalid && (control.dirty || control.touched);
}

/**
 * Constructs a full URL for an asset.
 * @param asset - The asset name
 * @returns {string} - The full URL for the asset.
 */
export function constructAssetUrl(asset = '') {
  return `${environment.apiAssetsUrl}/${asset}`;
}

/**
 * Converts an object to FormData.
 * @param data - The object to convert to FormData
 * @returns {FormData} - The FormData object.
 */
export function toFormData<T extends object>(data: T) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}
