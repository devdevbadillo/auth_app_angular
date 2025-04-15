import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { finalize, Observable, tap, of } from 'rxjs';

import { LoaderService } from "../../shared/service/loader.service";
import {CredentialService} from "../services/credential.service";

const isAuthorized = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  const loaderService: LoaderService = inject(LoaderService);
  const credentialService: CredentialService = inject(CredentialService);
  const router: Router = inject(Router);
  const token: string | null = route.queryParamMap.get('refreshToken');

  if (!token) {
    router.navigate(['./auth']);
    return of(false);
  }

  if(!loaderService.isLoading.getValue()) {
    loaderService.show();
  }

  return credentialService.isAuthorizedToRefreshAccessToVerifyAccount(token)
    .pipe(
      tap(isAuthorized => {
        if (!isAuthorized) router.navigate(['./auth']);
      }),
      finalize(() => {
        loaderService.hide();
      })
    );
}

export const refreshAccessToVerifyAccountGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return isAuthorized(route);
};
