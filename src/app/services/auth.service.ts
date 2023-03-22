import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { ResponseLogin } from '@models/auth.models';
import { User } from '@models/users.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.Api_URL;
  user$ = new BehaviorSubject<User | null>(null)

getDataUser() {
  return this.user$.getValue()
}
  constructor(private http: HttpClient, private tokenServices: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.tokenServices.saveToken(response.access_token);
        })
      );
  }

  register(email: string, name: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
      name,
      email,
      password,
    });
  }
  registerAndLogin(email: string, name: string, password: string) {
    return this.register(email, name, password).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/api/v1/auth/is-available`,
      { email }
    );
  }

  recovery(email: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`, { email });
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`, {
      token,
      newPassword,
    });
  }

  getProfile() {
    const token = this.tokenServices.getToken();
    return this.http.get<User>(`${this.apiUrl}/api/v1/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).pipe(tap(
      user => {
        this.user$.next(user)
      }
    ))
  }

  logout() {
    this.tokenServices.removeToken();
  }
}
