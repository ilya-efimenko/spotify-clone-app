import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const handleAuthError = (error: HttpErrorResponse) => {
    const params = new URLSearchParams(window.location.search);
    const authCode = params.get('code');

    if (error.status === 401) {
      if (!authCode) {
        authService.requestUserAuth();
      } else {
        authService.getToken(authCode);
      }
    } else {
      throw new Error(`Unauthorized request: ${error}`);
    }
  };

  const handleError = (err: unknown) => {
    if (err instanceof HttpErrorResponse) {
      handleAuthError(err);
    } else {
      throw new Error(`An unexpected error occurred: ${err}`);
    }
    return throwError(() => err);
  };

  return next(req).pipe(catchError(handleError));
};
