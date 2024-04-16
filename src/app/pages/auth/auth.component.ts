import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router, Event } from "@angular/router";

@Component({
    selector: 'servesync-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    public currentPage: string = 'Đăng nhập';
    
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.currentPage = this.getCurrentPageFromRoute(this.router.url);

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentPage = this.getCurrentPageFromRoute(event.url);
            }
        });
    }

    getCurrentPageFromRoute(route: string) {
        switch (route) {
            case '/auth/login':
                return 'Đăng nhập';
            case '/auth/change-password':
                return 'Đặt lại mật khẩu';
            case '/auth/reset-password':
                return 'Quên mật khẩu';
        }

        return '';
    }
}