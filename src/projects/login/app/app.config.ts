import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { HttpInterceptorService } from './http.interceptors';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([HttpInterceptorService])
    ),
  {provide:LocationStrategy, useClass:HashLocationStrategy},
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),  
  provideClientHydration(withEventReplay())
  ]
};
