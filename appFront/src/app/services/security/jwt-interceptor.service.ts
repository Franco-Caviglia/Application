import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-js-decode';

export const jwtInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const token = authService.userToken;

  if (token) {
    try {
      const decodedToken = jwtDecode(authService.userToken);
      const expiration = decodedToken.payload['exp'];

      if (expiration == Date.now()) {
        sessionStorage.clear();
        window.location.reload();
      }
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log('Error en la decodificación');
    }
  }

  return next(request);
};
