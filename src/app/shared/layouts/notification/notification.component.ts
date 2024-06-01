import { Component, OnInit } from "@angular/core";
import { ScrollerScrollIndexChangeEvent } from "primeng/scroller";
import { NotificationService } from "../../../core/services/notification.service";
import { BasicUserInfo, NotificationDto, NotificationStatus, NotificationType } from "../../../core/schemas";
import { finalize } from "rxjs";
import { UserStorageService } from "../../../core/services";
import { SignalrService } from "../../../core/services/realtime-client.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-notification',
    styleUrl: 'notification.component.scss',
    templateUrl: 'notification.component.html'
})
export class NotificationComponent implements OnInit {
    
    currentPage!: number;
    totalPage!: number;
    total!: number;
    isLoading: boolean = false;
    unReadCount?: number;
    loadedPages: number[] = [];
    notifications: NotificationDto[] = [];
    tenantUsers: BasicUserInfo[] = [];

    constructor(
        private notificationService: NotificationService,
        private userStorageService: UserStorageService,
        private realTimeService: SignalrService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.userStorageService.currentUser.subscribe(x => {
            if (x)
                this.tenantUsers = x.tenantUsers;
        });

        this.notificationService.getUnReadNotificationCount()
            .subscribe(x => {
                this.unReadCount = x;
            });

        this.realTimeService.notification$.subscribe(x => {
            this.notificationService.getUnReadNotificationCount()
                .subscribe(x => {
                    this.unReadCount = x;
                });
        });
    }

    user(id: string) : BasicUserInfo | undefined {
        return this.tenantUsers.find(x => x.id == id);
    }

    onShow() {
        this.total = 0;
        this.totalPage = 0;
        this.notifications = [];
        this.isLoading = false;
        this.loadedPages = [];

        this.notificationService.getUnReadNotificationCount()
            .subscribe(x => {
                this.unReadCount = x;
            });

        this.notificationService.getNotification(1, 10)
            .subscribe(x => {
                this.totalPage = x.totalPages;
                this.total = x.total;
                this.notifications = x.data;
                console.log(this.notifications);
                this.loadedPages.push(1);
            });
    }

    onScroll($event: ScrollerScrollIndexChangeEvent) {
        this.currentPage = Math.floor($event.last / 10);
        if (this.currentPage == this.totalPage || this.isLoading)
            return;

        const isLastOfCurrentPage = $event.last == (this.currentPage * 10);
        if (isLastOfCurrentPage && !this.loadedPages.includes(this.currentPage + 1)) {
            this.isLoading = true;
            this.loadedPages.push(this.currentPage + 1);
            this.notificationService.getNotification(this.currentPage + 1, 10)
                .pipe(
                    finalize(() => this.isLoading = false)
                )
                .subscribe(x => {
                    this.notifications = [...this.notifications, ...x.data];
                });
        }
    }

    markAllRead() {
        this.notificationService.markAllRead() 
            .subscribe(x => {
                this.unReadCount = 0;
                for (const notification of this.notifications) {
                    notification.status = NotificationStatus.Read;
                }
            });
    }

    onReadNotification() {
        if (this.unReadCount)
            this.unReadCount = this.unReadCount - 1;
    }
}