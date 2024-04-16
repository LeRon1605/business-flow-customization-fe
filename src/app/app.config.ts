import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { AuthTokenInterceptor } from './core/interceptors/auth-token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastService } from './core/services';
import { MessageService } from 'primeng/api';
import { AuthGuard } from './core/guards/auth.guard';
import { StudentState } from './core/states/students/student.state';
import { NgxsModule } from '@ngxs/store';
import { EducationProgramState } from './core/states/education-programs/education-program.state';
import { FacultyState } from './core/states/faculties/faculty.state';
import { HomeRoomState } from './core/states/home-rooms/home-room.state';

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
    MessageService,
    ToastService,
    AuthGuard,
    provideAnimations(),
    provideClientHydration(),
    importProvidersFrom(    
      NgxsModule.forRoot([
        StudentState,
        EducationProgramState,
        FacultyState,
        HomeRoomState
      ]
    ))
  ],
};
