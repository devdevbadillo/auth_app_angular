import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ValidatorsService} from "../../../shared/service/validators.service";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import {toast} from "ngx-sonner";

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
})
export class ChangePasswordPageComponent {

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly validatorsService: ValidatorsService,
  ) {
  }

  public changePasswordForm: FormGroup = this.fb.group({
    password: ["", [Validators.required, Validators.minLength(8)]],
    repeatPassword: ["", [Validators.required, Validators.minLength(3)]],
  }, {
    updateOn: 'submit',
    validators: this.validatorsService.isFieldOneEqualFieldTwo('password', 'repeatPassword')
  });

  public onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    const token: string | null = this.route.snapshot.queryParamMap.get('accessToken');
    const password = this.changePasswordForm.controls['password'].value;
    const repeatPassword = this.changePasswordForm.controls['repeatPassword'].value;

    this.authService.changePassword(token!, {password, repeatPassword}).subscribe({
      next: () => {
        this.navigateToSignIn();
      },
      error: () => {
        toast.error('Invalid token',
          { duration: 5000,
            description: "Message: Your token is invalid, please try again"
          }
        );
      }
    });

  }

  private navigateToSignIn() {
    this.router.navigateByUrl('/auth/sign-in');
  }
}
