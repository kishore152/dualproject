import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, switchMap, map, finalize } from 'rxjs/operators';

import { Router } from '@angular/router';
import { LoaderService } from './loader.service';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  
  // Inject token service or auth service if needed

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Example token (you'll usually get it from AuthService)
    const authToken = 'Bearer your-auth-token';

    // Clone request and add Authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken
      }
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Optional: Log error or show user-friendly message
        console.error('HTTP Error:', error);
        return throwError(() => error);
      })
    );
  }



}