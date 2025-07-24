import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), 
    provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({
        toastClass: 'ngx-toastr custom-toast',
        positionClass: 'toast-top-right',
        timeOut: 2000,
        progressBar: true,
        closeButton: true,
        preventDuplicates: true
      })
    )
  ]
};


