import { NgModule } from "@angular/core";
import { TenantRoutingModule } from "./tenant-routing.module";
import { TenantComponent } from "./tenant.component";
import { ServeSyncFormControlModule } from "../../shared/components/form-controls/form-control.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FieldsetModule } from 'primeng/fieldset';
import { ServeSyncCommonModule } from "../../shared/components/common/common.module";

@NgModule({
    declarations: [
        TenantComponent
    ],
    imports: [
        TenantRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        ServeSyncFormControlModule,
        FieldsetModule,
        ServeSyncCommonModule
    ]
})
export class TenantModule {

}