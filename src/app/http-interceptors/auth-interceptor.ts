import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {
  }


  // En tu AuthInterceptor
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // 1. CAMBIO: Leer 'token' en lugar de 'auth_token'
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders().set('Accept', 'application/json');

    if (token) {
      // 2. IMPORTANTE: Verifica si tu backend espera 'Bearer' o 'x-token'
      // Si tu backend usa el middleware que revisamos antes, debería ser:
      headers = headers.set('x-token', token);

      // O si usa el estándar Bearer:
      // headers = headers.set('Authorization', 'Bearer ' + token);
    }

    return next.handle(req.clone({ headers })).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {

          // 3. Limpieza consistente con lo que guardas
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          Swal.fire({
            title: 'Sesión expirada',
            text: 'Tu sesión ha vencido o no tienes permisos.',
            icon: 'warning',
            confirmButtonText: 'Ir al Login'
          }).then(() => {
            this._router.navigate(['/login']);
          });
        }
        return throwError(() => error);
      })
    );
  }


  errors(error: HttpErrorResponse) {
    if (error.status === 4030 || error.status === 4040 || error.status === 4230) {
      this._router.navigate(['/login']);
    }
    return throwError(error);
  }
}

