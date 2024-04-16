import { NgModule } from "@angular/core";
import { LinkComponent } from "./link/link.component";
import { ButtonModule } from 'primeng/button';
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "./button/button.component";
import { BadgeModule } from "primeng/badge";

@NgModule({
    declarations: [
        LinkComponent,
        ButtonComponent
    ],
    imports: [
        ButtonModule,
        BadgeModule,
        RouterLink
    ],
    exports: [
        LinkComponent,
        ButtonComponent
    ]
})
export class ServeSyncCommonModule { }