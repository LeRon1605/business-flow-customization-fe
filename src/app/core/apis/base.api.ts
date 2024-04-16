import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class BaseApiService {
    protected baseApiUrl = environment.baseUrl;
    protected API_END_POINTS: any;

    constructor(protected http: HttpClient) {
        this.API_END_POINTS = {
            LOGIN_REQUEST: this.baseApiUrl + '/auth/admin-portal/sign-in',
            REGISTER_REQUEST: this.baseApiUrl + '/auth/register',
            FORGET_PASSWORD_REQUEST: this.baseApiUrl + '/auth/forget-password',
            REFRESH_TOKEN_REQUEST: this.baseApiUrl + '/auth/refresh-token',
            USER_INFO: this.baseApiUrl + '/profile',
            RESET_PASSWORD: this.baseApiUrl + '/auth/forget-password/callback',
            STUDENT: this.baseApiUrl + '/students',
            FACULTY: this.baseApiUrl + '/faculties',
            HOOMROOM: this.baseApiUrl + '/homerooms',
            EDUCATION_PROGRAM: this.baseApiUrl + '/education-programs'
        };
    }
}