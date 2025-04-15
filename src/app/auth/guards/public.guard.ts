import { inject, } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import {finalize, map, Observable, tap, } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {LoaderService} from "../../shared/service/loader.service";

const isAuthenticate = (): Observable<boolean> => {
  const  loaderService: LoaderService = inject(LoaderService);
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);


  loaderService.show();
  return authService.auth()
    .pipe(
      tap(isAuth => {
        if (isAuth) router.navigate(['./app']);
      }),
      map(isAuth => !isAuth),
      finalize(() => {
        loaderService.hide();
      }),
    )
};

export const activePublic: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return isAuthenticate();
};
