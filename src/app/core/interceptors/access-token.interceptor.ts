import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ApiService } from '../services/api/api.service';

export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const api = inject(ApiService);

  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  return next(req).pipe(
    catchError((err: unknown) => {
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.error('Unauthorized request:', err);

          if (!code) {
            api.requestUserAuth();
          } else {
            api.getToken(code).subscribe();
          }

        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }

      return throwError(() => err); 
    })
  );
};
