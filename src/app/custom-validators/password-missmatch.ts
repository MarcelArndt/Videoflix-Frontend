import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const group = control as FormGroup;
  const password = group.get('password')?.value;
  const confirmPassword = group.get('repeatedPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
};