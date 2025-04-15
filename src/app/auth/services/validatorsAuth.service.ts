import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { toast } from 'ngx-sonner';

@Injectable({ providedIn: 'root' })
export class ValidatorsAuthService {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  getAuthFieldError(form: FormGroup, field: string): string | null {

    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Can’t be empty';
        case 'pattern':
          return "Email not valid";
        case 'minlength':
          return `Must be  least ${errors['minlength'].requiredLength} characters.`;
        case 'notEqual':
          return 'Passwords do not match';
        case 'emailTaken':
          return 'User already exists';
        case 'passwordIncorrect':
          return 'Please check again'
        case 'userNotExist':
          return 'User not registered';
        case 'userNotVerified':
          return 'User not verified';
      }
    }

    return null;
  }

  handleFormError(form: FormGroup, error: string) {
    switch (error) {
      case 'User not registered':
        form.controls['email'].setErrors({ 'userNotExist': true });
        break;
      case 'User already exists':
        form.controls['email'].setErrors({ 'emailTaken': true });
        break;
      case 'Password incorrect':
        form.controls['password'].setErrors({ 'passwordIncorrect': true });
        break;
      case 'The user has not been verified':
        form.controls['email'].setErrors({ 'userNotVerified': true });
        break;
      case 'The username and/or password you entered are incorrect, please try again':
        toast.error('Authentication error', {
          duration: 5000,
          description: 'Error: ' + error
        });
        break;
      case 'You already have instructions to change password, check your email':
        toast.error('Sending email error', {
          duration: 5000,
          description: 'Error: ' + error
        })
        break;
      default:
        break;
    }
  }
}
