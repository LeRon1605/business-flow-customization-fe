import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { AuthTokenInterceptor } from './core/interceptors/auth-token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AuthGuard } from './core/guards/auth.guard';
import { NgxsModule } from '@ngxs/store';
import { ToastService } from './core/services';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { NgxGraphModule } from '@kr0san89/ngx-graph';
import { CacheInterceptor } from './core/interceptors/cache.interceptor';
registerLocaleData(vi);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorHandlerInterceptor,
        multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    MessageService,
    ToastService,
    AuthGuard,
    provideAnimations(),
    provideClientHydration(),
    importProvidersFrom(    
      NgxsModule.forRoot([
      ]
    ), NgxGraphModule)
  ],
};
