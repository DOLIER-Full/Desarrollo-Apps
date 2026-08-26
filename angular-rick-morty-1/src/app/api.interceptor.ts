import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const startedAt = performance.now();

  const clonedRequest = req.clone({
    setHeaders: {
      Accept: 'application/json'
    }
  });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      const elapsed = Math.round(performance.now() - startedAt);
      console.error(`HTTP ${req.method} ${req.urlWithParams} - ${error.status} (${elapsed} ms)`);
      return throwError(() => error);
    })
  );
};
