import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LoaderService} from "../../../shared/service/loader.service";
import { toast } from 'ngx-sonner';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-auth-social-media',
  template: '',
})
export class AuthSocialMediaPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loaderService.show();

      const accessToken: string | null = params['accessToken'];
      const refreshToken: string | null = params['refreshToken'];
      const error: string | null = params['error'];
      const errorToken: string | null = params['errorToken'];

      if (accessToken && refreshToken) {
        this.handleSuccessOauthAuthentication(accessToken, refreshToken);
        return;
      }

      if(errorToken && error){
        this.handleFailureOauthAuthentication(error, errorToken);
      }

      this.navigateToSignIn();
    });
  }

  private navigateToSignIn() {
    this.router.navigateByUrl('/auth/sign-in');
    this.loaderService.hide();
  }

  private handleSuccessOauthAuthentication(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    this.router.navigateByUrl('/app');
    return;
  }

  private handleFailureOauthAuthentication(error: string, errorToken: string) {
    this.authService.oauth2Error(errorToken).subscribe({
      next: () => {
        toast.error('Authentication error', {
          duration: 5000,
          description: 'Error: ' + error
        });
      },
      error: () => this.navigateToSignIn()
    })
  }
}
