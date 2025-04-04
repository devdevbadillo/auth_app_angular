import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidatorsAuthService } from '../../services/validatorsAuth.service';

@Component({
  selector: 'auth-sign-in-page',
  templateUrl: './sign-in-page.component.html',
})
export class SignInPageComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private authValidator: ValidatorsAuthService
  ) { }

  public signInForm: FormGroup = this.fb.group(
    {
      email: ["", [Validators.required, Validators.pattern(this.authValidator.emailPattern)]],
      password: ["", [Validators.required], []]
    }, { updateOn: 'submit', }
  );

  public onSubmit(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const email = this.signInForm.controls['email'].value;
    const password = this.signInForm.controls['password'].value;

    this.authService.signIn({email, password})
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/app');
        },
        error: (error) => this.authValidator.handleFormError(this.signInForm, error)
      })
  }
}
