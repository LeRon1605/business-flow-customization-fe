import { NgModule } from "@angular/core";
import { LinkComponent } from "./link/link.component";
import { ButtonModule } from 'primeng/button';
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "./button/button.component";
import { BadgeModule } from "primeng/badge";
import { PermissionWrapperComponent } from "./permission-wrapper/permission-wrapper.component";
import { CommonModule } from "@angular/common";
import { ErrorComponent } from "./error/error.component";

@NgModule({
    declarations: [
        LinkComponent,
        ButtonComponent,
        PermissionWrapperComponent,
        ErrorComponent
    ],
    imports: [
        ButtonModule,
        BadgeModule,
        RouterLink,
        CommonModule
    ],
    exports: [
        LinkComponent,
        ButtonComponent,
        PermissionWrapperComponent,
        ErrorComponent
    ]
})
export class ServeSyncCommonModule { }