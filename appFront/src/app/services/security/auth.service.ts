import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { LoginDto } from '../model/login';
import { TokenDto } from '../model/tokenDto';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { RegisterDto } from '../model/register';
import { ValidationResponse } from '../model/validationResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(
      sessionStorage.getItem('token') != null
    );
    this.currentUserData = new BehaviorSubject<string>(
      sessionStorage.getItem('token') || ''
    );
  }

  public login(login: LoginDto): Observable<TokenDto> {
    return this.http
      .post<any>(`${environment.urlHost}auth` + `/login`, login)
      .pipe(
        tap((userData) => {
          console.log(userData);
          if (userData.token == 'Usuario y/o contraseña incorrectos!') {
            console.log(userData.success);
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              iconColor: 'yellow',
              customClass: {
                popup: 'colored-toast',
              },
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });

            (async () => {
              await Toast.fire({
                icon: 'warning',
                title: userData.token,
              });
            })();
          } else if (userData.token == 'Usuario no existente!') {
            console.log(userData.success);
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              iconColor: 'yellow',
              customClass: {
                popup: 'colored-toast',
              },
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });

            (async () => {
              await Toast.fire({
                icon: 'warning',
                title: userData.token,
              });
            })();
          } else if (userData.success) {
            sessionStorage.setItem('token', userData.token);
            sessionStorage.setItem('username', userData.username);
            sessionStorage.setItem('authority', userData.authority);
            sessionStorage.setItem('success', userData.success);
            this.currentUserData.next(userData);
            this.currentUserLoginOn.next(true);
          }
        }),
        map((userData) => userData.token)
      );
  }

  public register(register: RegisterDto): Observable<ValidationResponse> {
    return this.http.post<ValidationResponse>(
      `${environment.urlAuthApi}` + `/register`,
      register
    );
  }

  logOut(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.currentUserLoginOn.next(false);
    window.location.reload();
  }

  get userToken(): string {
    return this.currentUserData.value;
  }
}
