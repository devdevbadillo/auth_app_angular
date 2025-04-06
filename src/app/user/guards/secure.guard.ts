import { inject, } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import {finalize, map, Observable, tap, } from 'rxjs';
import {AuthService} from "../../auth/services/auth.service";
import {LoaderService} from "../../shared/service/loader.service";

const isAuthtenticated = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const loaderService = inject(LoaderService);
  const router = inject(Router);

  loaderService.show();

  return authService.auth()
    .pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          router.navigate(['./auth']);
        }
      }),
      finalize(() => {
        setTimeout(() => {
          loaderService.hide();
        }, 300);
      })
    )
};

export const activeSecure: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return isAuthtenticated();
};
