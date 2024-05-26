import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { HttpParams } from "@angular/common/http";
import { NotificationDto, PagedResult } from "../schemas";

@Injectable({ providedIn: 'root' })
export class NotificationApiService extends BaseApiService {

    getNotification(page: number, size: number) {
        let params: HttpParams = new HttpParams()
            .append('page', page)
            .append('size', size);

        return this.http.get<PagedResult<NotificationDto>>(this.API_END_POINTS.NOTIFICATION, {
            params
        });
    }

    getUnReadNotificationCount() {
        return this.http.get<number>(`${this.API_END_POINTS.NOTIFICATION}/unread-count`);
    }

    markRead(id: string) {
        return this.http.put(`${this.API_END_POINTS.NOTIFICATION}/${id}/mark-read`, { });
    }

    markAllRead() {
        return this.http.put(`${this.API_END_POINTS.NOTIFICATION}/mark-all-read`, { });
    }
}