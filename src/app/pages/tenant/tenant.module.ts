import { NgModule } from "@angular/core";
import { TenantRoutingModule } from "./tenant-routing.module";
import { TenantComponent } from "./tenant.component";
import { ServeSyncFormControlModule } from "../../shared/components/form-controls/form-control.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FieldsetModule } from 'primeng/fieldset';
import { ServeSyncCommonModule } from "../../shared/components/common/common.module";
import { ListUserComponent } from "./tenant-list-user/tenant-list-user.component";
import { UserDetailComponent } from "./tenant-user-detail/tenant-user-detail.component";
import { DataTableModule } from "../../shared/components/datatable/datatable.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    declarations: [
        TenantComponent,
        ListUserComponent,
        UserDetailComponent,
    ],
    imports: [
        TenantRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        DataTableModule,
        ServeSyncFormControlModule,
        FieldsetModule,
        ServeSyncCommonModule,
        MatDialogModule,
    ]
})
export class TenantModule {

}