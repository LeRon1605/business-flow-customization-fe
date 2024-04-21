import { NgModule } from "@angular/core";
import { TenantProfileComponent } from "./tenant-profile/tenant-profile.component";
import { TenantRoutingModule } from "./tenant-routing.module";
import { TenantComponent } from "./tenant.component";

@NgModule({
    declarations: [
        TenantComponent,
        TenantProfileComponent
    ],
    imports: [
        TenantRoutingModule
    ]
})
export class TenantModule {

}