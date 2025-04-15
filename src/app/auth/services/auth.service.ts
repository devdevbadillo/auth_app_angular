import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, of, finalize } from 'rxjs';
import { environments } from '../../../config/env';
import { AuthRoutes } from "../api/auth-routes";
import {SignUpRequest, SignInRequest, RecoveryAccountRequest, ChangePasswordRequest} from "../api/request";
import {SignInResponse, MessageResponse} from "../api/response";
import { Router } from '@angular/router';
import {UserRoutes} from "../../user/api/UserRoutes";
import {LoaderService} from "../../shared/service/loader.service";


@Injectable({ providedIn: 'root' })
export class AuthService {

  private publicApi: string = environments.publicApiUrl;
  private secureApi: string= environments.secureApiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService,
  ) { }

  private setAuthentication(token: string, refreshToken: string): boolean {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    return true;
  }

  signUp(signUpRequest: SignUpRequest): Observable<boolean> {
    return this.http.post<MessageResponse>(`${this.publicApi}/${AuthRoutes.signUp}`, signUpRequest)
      .pipe(
        map(({ message }: MessageResponse): boolean => !!message),
        catchError(err => throwError(() => err.error.message))
      )
  }

  signIn(signInRequest: SignInRequest): Observable<boolean> {
    return this.http.post<SignInResponse>(`${this.publicApi}/${AuthRoutes.signIn}`, signInRequest)
      .pipe(
        map(({ accessToken, refreshToken }: SignInResponse): boolean => this.setAuthentication(accessToken, refreshToken)),
        catchError(err => {
          return throwError(() => err.error.message)
        })
      )
  }

  recoveryAccount(request: RecoveryAccountRequest): Observable<string> {
    return this.http.post<MessageResponse>(`${this.publicApi}/${AuthRoutes.recoveryAccount}`, request)
      .pipe(
        map(({ message }: MessageResponse): string => message),
        catchError(err => throwError(() => err.error.message))
    )
  }

  isAuthorizedToRefreshAccessToVerifyAccount(token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<MessageResponse>(`${this.publicApi}/${AuthRoutes.refreshAccessToVerifyAccount}`, { headers })
      .pipe(
        map(({ message }: MessageResponse): boolean => !!message),
        catchError(() => of(false))
      )
  }

  refreshAccessToVerifyAccount(token: string): Observable<boolean> {
    this.loaderService.show()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<MessageResponse>(`${this.publicApi}/${AuthRoutes.refreshAccessToVerifyAccount}`, {}, { headers })
      .pipe(
        map(({ message }: MessageResponse): boolean => {
          return true;
        }),
        catchError(() => of(false)),
        finalize(() => {
          setTimeout(() => {
            this.loaderService.hide()
          }, 2000);
        })
      )
  }

  isAuthorizedViewChangePassword(token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<MessageResponse>(`${this.publicApi}/${AuthRoutes.changePassword}`, { headers })
      .pipe(
        map(({ message }: MessageResponse): boolean => !!message),
        catchError(() => of(false))
    )
  }

  changePassword(token: string, changePasswordRequest: ChangePasswordRequest): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<MessageResponse>(
      `${this.publicApi}/${AuthRoutes.changePassword}`,
      changePasswordRequest,
      { headers }
    ).pipe(
      map(({ message }: MessageResponse): boolean => !!message),
      catchError(err => throwError(() => err.error.message || 'Error al cambiar la contraseña'))
    );
  }

  verifyAccount(token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<SignInResponse>(
      `${this.publicApi}/${AuthRoutes.verifyAccount}`,
      {},
      { headers }
    ).pipe(
      map(({ accessToken, refreshToken }: SignInResponse): boolean => {
        this.setAuthentication(accessToken, refreshToken);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  oauth2Error(errorToken: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${errorToken}`);

    return this.http.get<MessageResponse>(`${this.publicApi}/${AuthRoutes.oauth2error}`, { headers })
      .pipe(
        map(({ message }: MessageResponse): boolean => {
          return true;
        }),
        catchError(err => throwError(() => err.error.message))
      )
  }

  auth(): Observable<boolean> {
    const accessToken: string | null = localStorage.getItem('accessToken');

    if (!accessToken) return of(false);

    return this.validateToken(accessToken).pipe(
      catchError(error => this.handleTokenError(error))
    );
  }

  private validateToken(token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<MessageResponse>(`${this.secureApi}/${UserRoutes.home}`, { headers }).pipe(
      map(({ message }: MessageResponse) => !!message)
    );
  }

  private handleTokenError(error: any): Observable<boolean> {
    if (error.error?.error === 'Token expired') return this.refreshAccessToken();

    return of(false);
  }

  private refreshAccessToken(): Observable<boolean> {
    const refreshToken: string | null = localStorage.getItem('refreshToken');

    if (!refreshToken) return of(false);

    const refreshHeaders = new HttpHeaders().set('refreshToken', refreshToken);

    return this.http.post<SignInResponse>(`${this.publicApi}/${AuthRoutes.refreshToken}`, {}, { headers: refreshHeaders }
    ).pipe(
      map((response: SignInResponse) => {
        localStorage.setItem('accessToken', response.accessToken);
        this.router.navigate(['./app']);
        return true;
      }),
      catchError(() => of(false))
    );
  }
}
