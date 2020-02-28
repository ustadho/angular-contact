import { AbstractControl, ValidatorFn } from '@angular/forms';

export class customValidationService {
  static checkLength(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        const val = c.value;
        console.log('key', c.value);
        console.log('val.length', val.length);
        if (c.value && (val.length >= min && val.length <= max)) {
            return { 'range': true };
        }
        return null;
    };
  }

   static checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        return null;
    };
  }
}
