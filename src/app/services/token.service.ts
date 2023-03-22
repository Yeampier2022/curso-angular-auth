import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  // Guardar Token con localStorage
  // saveToken(token: string) {
  //   localStorage.setItem('token', token);
  // }
  // guardar Token con cookie
  saveToken(token: string) {
    localStorage.setItem('token', token);
    setCookie('token-trello', token, { expires: 365, path: '/' });
  }
  // Local storage
  // getToken() {
  //   const token = localStorage.getItem('token');
  //   return token;
  // }
  // getCookie
  getToken() {
    const token = getCookie('token-trello');
    return token;
  }
  removeToken() {
    removeCookie('token-trello');
  }
}
