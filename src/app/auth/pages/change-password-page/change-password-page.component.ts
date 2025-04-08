import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ValidatorsService} from "../../../shared/service/validators.service";
import {LoaderService} from "../../../shared/service/loader.service";
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
})
export class ChangePasswordPageComponent implements OnInit {

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly validatorsService: ValidatorsService,
    private readonly loaderService: LoaderService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loaderService.show();
      const token: string | null = params['token'];

      if (token) {
        this.isAuthorizedForViewPage(token);
      }
    });
  }

  public changePasswordForm: FormGroup = this.fb.group({
    password: ["", [Validators.required, Validators.minLength(8)]],
    repeatPassword: ["", [Validators.required, Validators.minLength(3)]],
  }, {
    updateOn: 'submit',
    validators: this.validatorsService.isFieldOneEqualFieldTwo('password', 'repeatPassword')
  });

  public onSubmit(): void {

  }

  private navigateToSignIn() {
    this.router.navigateByUrl('/auth/sign-in');
    this.loaderService.hide();
  }

  private isAuthorizedForViewPage(token: string) {
    this.authService.isAuthorizedViewChangePassword(token).subscribe(
      {
        next: () => {},
        error: () => {
          this.navigateToSignIn();
        }
      }
    )
  }
}
