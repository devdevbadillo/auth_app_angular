import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ValidatorsAuthService} from "../../services/validatorsAuth.service";
import {toast} from "ngx-sonner";
import {LoaderService} from "../../../shared/service/loader.service";
import {CredentialService} from "../../services/credential.service";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-recovery-account-page',
  templateUrl: './recovery-account-page.component.html',
})
export class RecoveryAccountPageComponent {

  constructor(
    private readonly  fb: FormBuilder,
    private readonly credentialService: CredentialService,
    private readonly authValidator: ValidatorsAuthService,
    private readonly loaderService: LoaderService
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

    this.loaderService.startSending();

    this.credentialService.recoveryAccount({email}).pipe(
      finalize(() => this.loaderService.stopSending())
    ).subscribe({
      next: (message: string) => {
        this.recoveryAccountForm.reset();
        toast.success('Operation success', { description: message});
      },
      error: (error) => {
        this.authValidator.handleFormError(this.recoveryAccountForm, error);
      }
    });
  }
}
