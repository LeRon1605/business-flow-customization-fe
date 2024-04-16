import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services";

@Injectable()
export class AuthGuard  {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!this.authService.isAuthenticated() && !this.authService.isRefreshing) {
            this.authService.lastAuthenticatedPath = '/home';
            this.router.navigate(['/auth/login']);
            return false;
        }

        return true;
    }

}