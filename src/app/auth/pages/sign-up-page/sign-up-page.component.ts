import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { AuthService } from '../../services/auth.service';
import { ValidatorsAuthService } from '../../services/validatorsAuth.service';

@Component({
  selector: 'auth-sign-up-page',
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPageComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authValidator: ValidatorsAuthService
  ) { }

  public signUpForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(this.authValidator.emailPattern)]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    name: ["", [Validators.required, Validators.minLength(3)]],
  }, {
    updateOn: 'submit',
  });

  public onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const email = this.signUpForm.controls['email'].value;
    const password = this.signUpForm.controls['password'].value;
    const name = this.signUpForm.controls['name'].value;

    this.authService.signUp({email, password, name})
      .subscribe({
        next: () => {
          this.signUpForm.reset();
        },
        error: (error) => this.authValidator.handleFormError(this.signUpForm, error)
      })
  }

}
