import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import {MessageResponse} from "../../auth/api/response";
import {UserRoutes} from "../api/UserRoutes";
import {environments} from "../../../config/env";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private secureApi: string= environments.secureApiUrl;

  constructor(
    private readonly http: HttpClient,
    private router: Router
  ) { }

  signOut(): Observable<boolean> {
    const accessToken: string | null = localStorage.getItem('accessToken');

    if (!accessToken) return of(false);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<MessageResponse>(`${this.secureApi}/${UserRoutes.signOut}`, {}, { headers })
      .pipe(
        map(({ message }: MessageResponse) => {
          console.log(message);
          return !!message
        }),
        catchError(() => of(false))
      );
  }
}
