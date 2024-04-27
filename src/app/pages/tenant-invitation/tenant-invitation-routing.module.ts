import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TenantInvitationAcceptComponent } from "./tenant-invitation-accept/tenant-invitation-accept.component";
import { TenantInvitationComponent } from "./tenant-invitation.component";

const routes : Routes = [
  {
    path: '',
    component: TenantInvitationComponent,
    children: [
      {
        path: 'accept',
        component: TenantInvitationAcceptComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TenantInvitationRoutingModule {}