import { Injectable } from '@angular/core';
import { LoginRequestDto, RefreshTokenRequestDto, RegisterRequestDto, ResetPasswordRequestDto, ResetProfilePasswordDto } from '../schemas/auth.schema';
import { AuthApiService } from '../apis/auth.api';
import { TokenStorageService } from './token-storage.service';
import { BehaviorSubject, Observable, catchError, finalize, switchMap, tap, throwError } from 'rxjs';
import { ErrorApiResponse } from '../schemas/error.schema';
import { UserStorageService } from './user-storage.service';
import { UserInfo, UserUpdateDto } from '../schemas/user.schema';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { SignalrService } from './realtime-client.service';
import { NotificationType } from '../schemas';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  isRefreshing: boolean = false;
  isFetchUserInfo: boolean = false;

  private _lastAuthenticatedPath: string = '/';
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(
    private authApiService: AuthApiService, 
    private tokenStorageService: TokenStorageService,
    private userStorageService: UserStorageService,
    private router: Router,
    private toastService: ToastService,
    private realtimeService: SignalrService
  ) { 
    this.realtimeService.notification$.subscribe(x => {
      if (x.type == NotificationType.UserInvitationAccepted && this.isAuthenticated())
          this.authApiService.getUserInfo()
              .subscribe(x => {
                  this.userStorageService.setCurrentUser(x);
              });
    });
  }

  signIn(userNameOrEmail: string, password: string) {
    const signInRequest : LoginRequestDto = { userNameOrEmail, password };

    return this.authApiService.signIn(signInRequest).pipe(
      tap(response => {
        this.tokenStorageService.setAccessToken(response.accessToken);
        this.tokenStorageService.setRefreshToken(response.refreshToken);
      }),
      switchMap(response => this.authApiService.getUserInfo()),
      tap(response => {
        this.authenticated.next(true);
        this.userStorageService.setCurrentUser(response);
      }),
      catchError<any, Observable<ErrorApiResponse>>((errorResponse) : Observable<ErrorApiResponse> => {
        this.authenticated.next(false);
        return throwError({
          code: errorResponse.error.code,
          message: errorResponse.error.message
      });
    }));
  }

  register(request: RegisterRequestDto) {
    return this.authApiService.register(request);
  }

  refreshToken() {
    const data: RefreshTokenRequestDto = {
      accessToken: <string>this.tokenStorageService.getAccessToken(),
      refreshToken: <string>this.tokenStorageService.getRefreshToken()
    };

    this.refreshTokenSubject.next(null);
    this.isRefreshing = true;
    return this.authApiService.refreshToken(data)
      .pipe(
        tap(response => {
          this.tokenStorageService.setAccessToken(response.accessToken);
          this.tokenStorageService.setRefreshToken(response.refreshToken);
          this.refreshTokenSubject.next(response.refreshToken);
        }),
        switchMap(response => this.authApiService.getUserInfo()),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
  }

  exchangeTenant(tenantId: number) {
    return this.authApiService.exchangeTenant(tenantId)
      .pipe(
        tap(response => {
          this.tokenStorageService.setAccessToken(response.accessToken);
          this.tokenStorageService.setRefreshToken(response.refreshToken);
        })
      );
  }

  autoRefreshToken() {
    if (!this.tokenStorageService.isValidAccessToken() && this.tokenStorageService.getRefreshToken() != null) {
      this.refreshToken()
        .subscribe(
          response => {
            this.setAuthenticatedUser(response);
          },
          error => {
            this.setAuthenticatedUser(null);
            this.toastService.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
            this.router.navigate(['/auth/login']);
          }
        );
    }
  }

  setAuthenticatedUser(user: UserInfo | null) {
    if (user == null) {
      this.authenticated.next(false);
      this.userStorageService.setCurrentUser(null);
      this.tokenStorageService.clear();
    } else {
      this.authenticated.next(true);
      this.userStorageService.setCurrentUser(user);
    }
  }

  autoLogin() {
    if (this.tokenStorageService.getAccessToken() != null && this.tokenStorageService.getRefreshToken() != null) {
      const token = this.tokenStorageService.getToken();

      this.isFetchUserInfo = true;
      this.authApiService.getUserInfo()
        .pipe(
          finalize(() => this.isFetchUserInfo = false)
        )
        .subscribe(
          response => {
            this.setAuthenticatedUser(response);
          }
        );
      }
  }

  signOut() {
    this.setAuthenticatedUser(null);
  }

  requestForgetPassword(email: string) {
    return this.authApiService.requestForgetPasswordToken(email);
  }

  resetPassword(newPassword: string, token: string) {
    const data: ResetPasswordRequestDto = {
      token,
      newPassword
    };

    return this.authApiService.resetPassword(data);
  }

  isAuthenticated() {
    return this.authenticated.value;
  }

  updateProfile(data: UserUpdateDto) {
    return this.authApiService.updateProfile(data).pipe(
      switchMap(response => this.authApiService.getUserInfo()),
      tap(response => {
        this.authenticated.next(true);
        this.userStorageService.setCurrentUser(response);
      }),
      finalize(() => this.isFetchUserInfo = false)
    );
  }

  resetProfilePassword(data: ResetProfilePasswordDto) {
    return this.authApiService.resetProfilePassword(data);
  }
}