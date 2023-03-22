import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { User } from '@models/users.models';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = environment.Api_URL;

  constructor(private http: HttpClient, private tokenServices: TokenService) {}

  getUsers() {
    const token = this.tokenServices.getToken();
    return this.http.get<User[]>(`${this.apiUrl}/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
