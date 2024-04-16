import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    constructor(private tokenStorage: TokenStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.tokenStorage.isValidAccessToken()) {
            const accessToken = this.tokenStorage.getAccessToken();
            const authenticatedRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
            });

            return next.handle(authenticatedRequest);
        }

        return next.handle(req);
    }
}