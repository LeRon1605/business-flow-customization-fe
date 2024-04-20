import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class BaseApiService {
    protected baseApiUrl = environment.baseUrl;
    protected API_END_POINTS: any;

    constructor(protected http: HttpClient) {
        this.API_END_POINTS = {
            LOGIN_REQUEST: this.baseApiUrl + '/identity/auth/sign-in',
            REGISTER_REQUEST: this.baseApiUrl + '/identity/auth/register',
            FORGET_PASSWORD_REQUEST: this.baseApiUrl + '/identity/auth/forget-password',
            REFRESH_TOKEN_REQUEST: this.baseApiUrl + '/identity/auth/refresh-token',
            USER_INFO: this.baseApiUrl + '/identity/profile',
            RESET_PASSWORD: this.baseApiUrl + '/identity/auth/forget-password/callback',
            EXCHANGE_TENANT: this.baseApiUrl + '/identity/auth/exchange-tenant-access-token',
            RESET_PROFILE_PASSWORD: this.baseApiUrl + '/identity/profile/change-password'
        };
    }
}