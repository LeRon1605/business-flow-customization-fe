import { Injectable } from "@angular/core";
import { NotificationApiService } from "../apis/notification.api";

@Injectable({ providedIn: 'root' })
export class NotificationService {

    constructor(
        private notificationApiService: NotificationApiService
    ) {}

    getNotification(page?: number, size?: number) {
        const isPaging = page != undefined && size != undefined;

        return this.notificationApiService.getNotification(page ?? 1, size ?? 10, isPaging);
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