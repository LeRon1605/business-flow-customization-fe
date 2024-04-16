import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { LoginRequestDto, LoginResponseDto, RefreshTokenRequestDto, RefreshTokenResponseDto, ResetPasswordRequestDto } from "../schemas/auth.schema";
import { UserInfo } from "../schemas/user.schema";

@Injectable({ providedIn: 'root' })
export class AuthApiService extends BaseApiService{
    signIn(data: LoginRequestDto) {
        return this.http.post<LoginResponseDto>(this.API_END_POINTS.LOGIN_REQUEST, data);
    }

    refreshToken(data: RefreshTokenRequestDto) {
        return this.http.post<RefreshTokenResponseDto>(this.API_END_POINTS.REFRESH_TOKEN_REQUEST, data);
    }

    getUserInfo(accessToken: string) {
        return this.http.get<UserInfo>(this.API_END_POINTS.USER_INFO);
    }

    requestForgetPasswordToken(email: string) {
        return this.http.post(this.API_END_POINTS.FORGET_PASSWORD_REQUEST, {
            userNameOrEmail: email,
            callbackUrl: window.location.origin + '/auth/change-password'
        });
    }

    resetPassword(data: ResetPasswordRequestDto) {
        return this.http.post(this.API_END_POINTS.RESET_PASSWORD, data);
    }
}