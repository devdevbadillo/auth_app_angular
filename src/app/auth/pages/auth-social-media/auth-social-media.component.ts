import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LoaderService} from "../../../shared/service/loader.service";

@Component({
  selector: 'page-auth-social-media',
  template: '',
})
export class AuthSocialMediaPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loaderService.show();
      const accessToken: string | null = params['accessToken'];
      const refreshToken: string = params['refreshToken'];

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        this.router.navigateByUrl('/app');

        this.loaderService.hide();
        return;
      }

      this.router.navigateByUrl('/auth/sign-in');

      this.loaderService.hide();
    });
  }
}
