import { FormGroup, AbstractControl} from "@angular/forms";


interface ValidationOptions {
  MIN_PASSWORD_LENGTH?: number;
}

interface Error {
  message:string,
  hasError:boolean
}

export class ValidationHelperClass {
  private form: FormGroup;
  private MIN_PASSWORD_LENGTH:number = 0
  public errorCounter = 0

  constructor(formGroup: FormGroup,  options: ValidationOptions = {}) {
    this.form = formGroup;
    this.MIN_PASSWORD_LENGTH = options.MIN_PASSWORD_LENGTH || 0
  }

  private label(field: string): string {
    switch (field) {
      case 'username': return 'Username';
      case 'first-name': return 'First Name';
      case 'second-name': return 'Second Name';
      case 'email': return 'E-Mail';
      case 'password': return 'Password';
      case 'repeatedPassword': return 'Confirm Password';
      default: return field;
    }
  }


checkError(): string | null {
  const controls = this.form.controls;

  for (const fieldName in controls) {
    if (controls.hasOwnProperty(fieldName)) {
      const error = this.getError(fieldName);
      if (error) return error.message;
    }
  }

  const formError = this.getFormError('passwordMismatch');
  if (formError) return formError.message;
  return null;
}

  getError(field: string): Error | null {
    const control: AbstractControl | null = this.form.get(field);
    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) {
      return {message:`${this.label(field)} is required.`, hasError:true};
    }

    if (control.errors['pattern']) {
      return {message:`${this.label(field)} has invalid format.`, hasError:true}
    }

    if (control.errors['minlength']) {
      return {message: `${this.label(field)} must be at least ${this.MIN_PASSWORD_LENGTH} characters.`, hasError:true};
    }
    return {message:"", hasError:false};
  }

  getFormError(errorKey: string): Error  {
    const errors = this.form.errors;
    if (!errors || !this.form.touched) return {message:"", hasError:false};

    if (errorKey === 'passwordMismatch' && errors['passwordMismatch']) {
      return {message:"Passwords do not match.", hasError:true};
    }
    return {message:"", hasError:false};
  }

}