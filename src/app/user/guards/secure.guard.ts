import { inject, } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable, tap, } from 'rxjs';
import {AuthService} from "../../auth/services/auth.service";

const isAuthtenticated = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.auth()
    .pipe(
      tap(isAuth => {
        if (!isAuth) router.navigate(['./auth']);
      })
    )
};

export const activeSecure: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return isAuthtenticated();
};
