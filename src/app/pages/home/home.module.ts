import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home.routing";
import { HomeWidgetComponent } from "./home-widget/home-widget.component";
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from "@angular/common";
import { SkeletonModule } from 'primeng/skeleton';
import { ChipModule } from 'primeng/chip';
import { NotificationModule } from "../../shared/components/notification/notification.module";
import { DialogModule } from 'primeng/dialog';
import { SubmissionModule } from "../submission/submission.module";

@NgModule({
    declarations: [
        HomeComponent,
        HomeWidgetComponent
    ],
    imports: [
        HomeRoutingModule,
        ScrollPanelModule,
        AvatarModule,
        CommonModule,
        SkeletonModule,
        ChipModule,
        NotificationModule,
        DialogModule,
        SubmissionModule
    ]
})
export class HomeModule { }