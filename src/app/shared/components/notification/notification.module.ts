import { NgModule } from "@angular/core";
import { NotificationItemComponent } from "./notification-item.component";
import { AvatarModule } from "primeng/avatar";
import { TimeAgoPipe } from "../../../core/pipes/time-ago.pipe";
import { CommonModule } from "@angular/common";

@NgModule({
    providers: [
        TimeAgoPipe
    ],
    imports: [
        AvatarModule,
        CommonModule
    ],
    declarations: [
        NotificationItemComponent,
        TimeAgoPipe
    ],
    exports: [
        NotificationItemComponent
    ]
})
export class NotificationModule { 

}