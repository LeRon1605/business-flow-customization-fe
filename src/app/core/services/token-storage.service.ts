import { Injectable } from "@angular/core";
import { CLAIMS, TOKEN_STORAGE } from "../constants";
import { TokenCredential } from "../schemas/token.schema";

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
    setAccessToken(token: string) {
        localStorage.setItem(TOKEN_STORAGE.ACCESS_TOKEN, token);
    }

    setRefreshToken(token: string) {
        localStorage.setItem(TOKEN_STORAGE.REFRESH_TOKEN, token);
    }

    getAccessToken() : string | null {
        return localStorage.getItem(TOKEN_STORAGE.ACCESS_TOKEN);
    }

    getRefreshToken() : string | null {
        return localStorage.getItem(TOKEN_STORAGE.REFRESH_TOKEN)
    }
 
    getToken() : TokenCredential {
        return {
            accessToken: localStorage.getItem(TOKEN_STORAGE.ACCESS_TOKEN),
            refreshToken: localStorage.getItem(TOKEN_STORAGE.REFRESH_TOKEN)
        }
    }

    clear() {
        localStorage.removeItem(TOKEN_STORAGE.ACCESS_TOKEN);
        localStorage.removeItem(TOKEN_STORAGE.REFRESH_TOKEN);
    }

    parseJwtToken(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    isValidAccessToken() {
        const token = this.getToken();
        if (token.accessToken == null) return false;

        const claims = this.parseJwtToken(<string>token.accessToken);

        // return claims[CLAIMS.EXPIRE] * 1000 > Date.now();
        return true;
    }
}