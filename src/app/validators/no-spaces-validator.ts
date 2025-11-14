import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noSpaceValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const hasSpaces = (value || '').includes(' ');
  return hasSpaces ? { noSpaces: true } : null;
}
