import { Injectable } from '@angular/core';
import {environments} from "../../../config/env";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import {ChangePasswordRequest, RecoveryAccountRequest, SignUpRequest} from "../api/request";
import {MessageResponse, SignInResponse} from "../api/response";
import {AuthRoutes} from "../api/auth-routes";
import {setAuthentication} from "../helpers";

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  private publicApi: string = environments.publicApiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  signUp(signUpRequest: SignUpRequest): Observable<boolean> {
    return this.http.post<MessageResponse>(`${this.publicApi}/${AuthRoutes.signUp}`, signUpRequest)
      .pipe(
        map(({ message }: MessageResponse): boolean => !!message),
        catchError(err => throwError(() => err.error.message))
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

    return this.http.patch<MessageResponse>(`${this.publicApi}/${AuthRoutes.refreshAccessToVerifyAccount}`, {}, { headers })
      .pipe(
        map(({ message }: MessageResponse): boolean => !!message),
        catchError(() => of(false))
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
      catchError(err => throwError(() => err.error.message))
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
        setAuthentication(accessToken, refreshToken);
        return true;
      }),
      catchError(() => of(false))
    );
  }

}
