import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LoaderService} from "../../../shared/service/loader.service";
import { take, switchMap } from 'rxjs/operators';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-refresh-access-to-verify-page',
  templateUrl: './refresh-access-to-verify-page.component.html',
})
export class RefreshAccessToVerifyPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(
      take(1),
      switchMap(params => {
        const refreshToken: string = params['refreshToken'];
        return this.authService.refreshAccessToVerifyAccount(refreshToken);
      })
    ).subscribe({
      next: () => {
      },
      error: () => {
        this.navigateToSignIn();
      }
    });
  }

  private navigateToSignIn() {
    this.router.navigateByUrl('/auth/sign-in');
  }
}
