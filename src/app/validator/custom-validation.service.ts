import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidationService {
  static checkLength(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        const val = c.value;
        if (c.value && (val.length >= min && val.length <= max)) {
            return { range: true };
        }
        return null;
    };
  }

   static checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { range: true };
        }
        return null;
    };
  }
}
