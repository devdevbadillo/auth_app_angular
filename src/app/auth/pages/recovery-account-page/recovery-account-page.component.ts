import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {ValidatorsAuthService} from "../../services/validatorsAuth.service";
import {toast} from "ngx-sonner";

@Component({
  selector: 'app-recovery-account-page',
  templateUrl: './recovery-account-page.component.html',
})
export class RecoveryAccountPageComponent {

  constructor(
    private readonly  fb: FormBuilder,
    private  readonly authService: AuthService,
    private readonly authValidator: ValidatorsAuthService
  ) {
  }

  public recoveryAccountForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(this.authValidator.emailPattern)]],
  }, {
    updateOn: 'submit',
  });

  onSubmit(){
    if (this.recoveryAccountForm.invalid) {
      this.recoveryAccountForm.markAllAsTouched();
      return;
    }

    const email = this.recoveryAccountForm.controls['email'].value;
    this.authService.recoveryAccount({email}).subscribe({
      next: (message: string ) => {
        this.recoveryAccountForm.reset();
        toast.success('Operation success', { description: message});
      },
      error: (error) => this.authValidator.handleFormError(this.recoveryAccountForm, error)
    });
  }
}
