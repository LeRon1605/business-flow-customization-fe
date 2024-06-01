import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SideBarLayout } from "./side-bar-layout/side-bar-layout.component";
import { FooterComponent, HeaderComponent, SideNavigationMenuComponent } from "./";
import { BasicLayoutComponent } from "./basic-layout/basic-layout.component";
import { CoreModule } from "../../core/core.module";
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TreeModule } from 'primeng/tree';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ReactiveFormsModule } from "@angular/forms";
import { ServeSyncFormControlModule } from "../components/form-controls/form-control.module";
import { SkeletonModule } from 'primeng/skeleton';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { UserPanelComponent } from "../components";
import { ServeSyncCommonModule } from "../components/common/common.module";
import { ResetPasswordComponent } from "../components/reset-password-form/reset-password.component";
import { TenantProfileComponent } from "./tenant-profile/tenant-profile.component";
import { TenantInvitationComponent } from "./tenant-invitation/tenant-invitation.component";
import { DataTableModule } from "../components/datatable/datatable.component";
import { SpaceModule } from "../../pages/space/space.module";
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NotificationComponent } from "./notification/notification.component";
import { ScrollerModule } from 'primeng/scroller';
import { NotificationModule } from "../components/notification/notification.module";

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        SideNavigationMenuComponent,
        SideBarLayout,
        BasicLayoutComponent,
        UserPanelComponent,
        ResetPasswordComponent,
        TenantProfileComponent,
        TenantInvitationComponent,
        NotificationComponent
    ],
    imports: [
        CoreModule,
        CommonModule,
        RouterModule,
        SidebarModule,
        ButtonModule,
        AvatarModule,
        PanelMenuModule,
        TreeModule,
        ToolbarModule,
        InputIconModule,
        IconFieldModule,
        ReactiveFormsModule,
        ServeSyncFormControlModule,
        SkeletonModule,
        TieredMenuModule,
        DividerModule,
        DialogModule,
        ServeSyncCommonModule,
        DataTableModule,
        SpaceModule,
        TooltipModule,
        BadgeModule,
        OverlayPanelModule,
        ScrollerModule,
        NotificationModule
    ]
})
export class LayoutModule { }