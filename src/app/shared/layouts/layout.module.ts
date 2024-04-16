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
import { MenuModule } from 'primeng/menu';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ReactiveFormsModule } from "@angular/forms";
import { ServeSyncFormControlModule } from "../components/form-controls/form-control.module";
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        SideNavigationMenuComponent,
        SideBarLayout,
        BasicLayoutComponent
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
        MenuModule,
        InputIconModule,
        IconFieldModule,
        ReactiveFormsModule,
        ServeSyncFormControlModule,
        SkeletonModule
    ]
})
export class LayoutModule { }