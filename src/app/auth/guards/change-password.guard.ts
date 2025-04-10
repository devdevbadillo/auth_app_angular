import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { finalize, Observable, tap, of } from 'rxjs';
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

  return authService.isAuthorizedViewChangePassword(token)
    .pipe(
      tap(isAuthorized => {
        if (!isAuthorized) router.navigate(['./auth']);
      }),
      finalize(() => {
        setTimeout(() => {
          loaderService.hide();
        }, 500);
      })
    );
}

export const changePasswordGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return isAuthorized(route);
};
