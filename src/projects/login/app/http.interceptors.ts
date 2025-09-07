import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, switchMap, map, finalize } from 'rxjs/operators';

import { Router } from '@angular/router';
import { LoaderService } from './loader.service';


export const HttpInterceptorService:  HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const token = sessionStorage.getItem('token');

  loaderService.showLoader();

  if(token != null){
   const authReq = req.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    return next(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          loaderService.hideLoader();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        loaderService.hideLoader();
        return throwError(() => error);
      })
    );
  }else{
    const authReq1 = req.clone({});
    return next(authReq1).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          loaderService.hideLoader();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        loaderService.hideLoader();
        return throwError(() => error);
      })
    );;
  }
};