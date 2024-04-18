export interface LoginRequestDto {
    userNameOrEmail: string;
    password: string;
}

export interface RegisterRequestDto {
    email: string;
    fullName: string;
    tenantName: string;
    password: string;
}

export interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenRequestDto {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenResponseDto {
    accessToken: string;
    refreshToken: string;
}

export interface ResetPasswordRequestDto {
    newPassword: string;
    token: string;
}

export interface ExchangeTenantResponseDto {
    accessToken: string;
    refreshToken: string;
}