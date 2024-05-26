import { Injectable } from "@angular/core";
import { NotificationApiService } from "../apis/notification.api";

@Injectable({ providedIn: 'root' })
export class NotificationService {

    constructor(
        private notificationApiService: NotificationApiService
    ) {}

    getNotification(page: number, size: number) {
        return this.notificationApiService.getNotification(page, size);
    }

    getUnReadNotificationCount() {
        return this.notificationApiService.getUnReadNotificationCount();
    }

    markRead(id: string) {
        return this.notificationApiService.markRead(id);
    }

    markAllRead() {
        return this.notificationApiService.markAllRead();
    }
}