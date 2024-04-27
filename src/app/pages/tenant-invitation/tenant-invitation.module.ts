import { NgModule } from "@angular/core";
import { ServeSyncFormControlModule } from "../../shared/components/form-controls/form-control.module";
import { ServeSyncCommonModule } from "../../shared/components/common/common.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TenantInvitationComponent } from "./tenant-invitation.component";
import { TenantInvitationRoutingModule } from "./tenant-invitation-routing.module";
import { TenantInvitationAcceptComponent } from "./tenant-invitation-accept/tenant-invitation-accept.component";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TenantInvitationInitAccountComponent } from "./tenant-invitation-init-account/tenant-invitation-init-account.component";

@NgModule({
    declarations: [
        TenantInvitationComponent,
        TenantInvitationAcceptComponent,
        TenantInvitationInitAccountComponent
    ],
    imports: [
        TenantInvitationRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        ServeSyncFormControlModule,
        ServeSyncCommonModule,
        ProgressSpinnerModule
    ]
})
export class TenantInvitationModule { }