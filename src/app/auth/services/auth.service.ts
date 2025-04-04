import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { environments } from '../../../config/env';
import { AuthRoutes } from "../api/auth-routes";
import {SignUpRequest, SignInRequest} from "../api/request";
import {SignInResponse, MessageResponse} from "../api/response";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private publicApi = environments.publicApiUrl;
  private secureApi = environments.secureApiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  private setAuthentication(token: string): boolean {
    localStorage.setItem('token', token);
    return true;
  }

  signUp(signUpRequest: SignUpRequest): Observable<boolean> {
    return this.http.post<MessageResponse>(`${this.publicApi}/${AuthRoutes.signUp}`, signUpRequest)
      .pipe(
        map(({ message }) => !!message),
        catchError(err => throwError(() => err.error.message))
      )
  }

  signIn(signInRequest: SignInRequest): Observable<boolean> {
    return this.http.post<SignInResponse>(`${this.publicApi}/${AuthRoutes.signIn}`, signInRequest)
      .pipe(
        map(({ accessToken, refreshToken }) => this.setAuthentication(accessToken)),
        catchError(err => {
          console.log(err)
          return throwError(() => err.error.message)
        })
      )
  }

  auth(): Observable<boolean> {
    if (typeof window === 'undefined' || !window.localStorage) {
      return of(false);
    }

    const token: string | null = localStorage.getItem('token');
    if (!token) return of(false);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<MessageResponse>(`${this.secureApi}/user`, { headers }).pipe(
      map(({ message }) => !!message),
      catchError(() => of(false))
    );
  }

}
