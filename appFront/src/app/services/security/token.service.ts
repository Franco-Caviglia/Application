import { Injectable } from '@angular/core';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';
const AUTHORITIES_KEY = 'authAuthorities';
const SUCCESS_KEY = 'authSuccess';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public setAuthorities(authorities: string): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, authorities);
  }

  public getAuthorities(): string {
    return sessionStorage.getItem(AUTHORITIES_KEY)!;
  }

  public setUser(user: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
  }

  public getSuccessKey(): string {
    return sessionStorage.getItem(SUCCESS_KEY)!;
  }

  public setSuccessKey(success: string): void {
    window.sessionStorage.removeItem(SUCCESS_KEY);
    window.sessionStorage.setItem(SUCCESS_KEY, success);
  }

  public getUser(): string {
    return sessionStorage.getItem(USER_KEY)!;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
