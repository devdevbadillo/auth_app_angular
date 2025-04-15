import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { AuthService } from '../../services/auth.service';
import { ValidatorsAuthService } from '../../services/validatorsAuth.service';
import { toast } from 'ngx-sonner';
import {LoaderService} from "../../../shared/service/loader.service";
import {CredentialService} from "../../services/credential.service";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'auth-sign-up-page',
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPageComponent {

  constructor(
    private fb: FormBuilder,
    private credentialService: CredentialService,
    private authValidator: ValidatorsAuthService,
    private loaderService: LoaderService
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

    this.loaderService.startSending()
    this.credentialService.signUp({email, password, name}).pipe(
      finalize(() => this.loaderService.stopSending())
    ).subscribe({
        next: () => {
          this.signUpForm.reset();
          toast.success('Operation success', { description: 'Message: User registered successfully'});
        },
        error: (error) => {
          this.authValidator.handleFormError(this.signUpForm, error)
        },
      })
  }

}
