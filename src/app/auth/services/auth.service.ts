import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { Router } from '@angular/router';

import { environments } from '../../../config/env';
import { AuthRoutes } from "../api/auth-routes";
import {SignInRequest} from "../api/request";
import {SignInResponse, MessageResponse} from "../api/response";
import {UserRoutes} from "../../user/api/UserRoutes";
import {setAuthentication} from "../helpers";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private publicApi: string = environments.publicApiUrl;
  private secureApi: string= environments.secureApiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  signIn(signInRequest: SignInRequest): Observable<boolean> {
    return this.http.post<SignInResponse>(`${this.publicApi}/${AuthRoutes.signIn}`, signInRequest)
      .pipe(
        map(({ accessToken, refreshToken }: SignInResponse): boolean => {
            setAuthentication(accessToken, refreshToken);
            return true;
          }),
        catchError(err => {
          return throwError(() => err.error.message)
        })
      )
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
