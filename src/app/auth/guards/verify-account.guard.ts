import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { finalize, Observable, tap, of, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoaderService } from "../../shared/service/loader.service";

const isAuthorized = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  const loaderService: LoaderService = inject(LoaderService);
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const token: string | null = route.queryParamMap.get('accessToken');

  if (!token) {
    router.navigate(['./auth']);
    return of(false);
  }

  loaderService.show();

  return authService.verifyAccount(token)
    .pipe(
      tap(isAuthorized => {
        if (isAuthorized) router.navigate(['./app']);
      }),
      map(isAuthorized => {
        router.navigate(['./auth']);
        return !isAuthorized;
      }),
      finalize(() => {
        setTimeout(() => {
          loaderService.hide();
        }, 500);
      })
    );
}

export const verifyAccountGuard: CanActivateFn = (route, state) => {
  return isAuthorized(route);
};
