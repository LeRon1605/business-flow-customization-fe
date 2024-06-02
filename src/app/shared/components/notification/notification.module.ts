import { NgModule } from "@angular/core";
import { NotificationItemComponent } from "./notification-item.component";
import { AvatarModule } from "primeng/avatar";
import { CommonModule } from "@angular/common";
import { ApplicationPipeModule } from "../../../core/pipes/application-pipe.module";

@NgModule({
    imports: [
        AvatarModule,
        CommonModule,
        ApplicationPipeModule
    ],
    declarations: [
        NotificationItemComponent
    ],
    exports: [
        NotificationItemComponent
    ]
})
export class NotificationModule { 

}