import { inject, } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable, tap, } from 'rxjs';
import { AuthService } from '../services/auth.service';

const isAuthtenticated = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.auth()
    .pipe(
      tap(isAuth => {
        if (isAuth) router.navigate(['./app']);
      }),
      map(isAuth => !isAuth)
    )
};

export const activePublic: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return isAuthtenticated();
};
