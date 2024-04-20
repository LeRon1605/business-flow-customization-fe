import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { ExchangeTenantResponseDto, LoginRequestDto, LoginResponseDto, RefreshTokenRequestDto, RefreshTokenResponseDto, RegisterRequestDto, ResetPasswordRequestDto, ResetProfilePasswordDto } from "../schemas/auth.schema";
import { UserInfo, UserUpdateDto } from "../schemas/user.schema";

@Injectable({ providedIn: 'root' })
export class AuthApiService extends BaseApiService{
    signIn(data: LoginRequestDto) {
        return this.http.post<LoginResponseDto>(this.API_END_POINTS.LOGIN_REQUEST, data);
    }

    register(data: RegisterRequestDto) {
        return this.http.post(this.API_END_POINTS.REGISTER_REQUEST, data);
    }

    refreshToken(data: RefreshTokenRequestDto) {
        return this.http.post<RefreshTokenResponseDto>(this.API_END_POINTS.REFRESH_TOKEN_REQUEST, data);
    }

    getUserInfo() {
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

    exchangeTenant(tenantId: number) {
        return this.http.post<ExchangeTenantResponseDto>(this.API_END_POINTS.EXCHANGE_TENANT, {
            tenantId
        })
    }

    updateProfile(data: UserUpdateDto) {
        return this.http.put(this.API_END_POINTS.USER_INFO, data);
    }

    resetProfilePassword(data: ResetProfilePasswordDto) {
        return this.http.post(this.API_END_POINTS.RESET_PROFILE_PASSWORD, data);
    }
}