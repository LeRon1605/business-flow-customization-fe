import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })
export class ToastService {
    constructor(private messageService: MessageService) {}

    success(detail: string) {
        this.messageService.add({ 
            severity: 'success', 
            summary: 'Thông báo', 
            detail: detail, 
        }); 
    }

    error(detail: string) {
        this.messageService.add({
            severity: 'error',
            summary: 'Thông báo',
            detail: detail
        })
    }
}