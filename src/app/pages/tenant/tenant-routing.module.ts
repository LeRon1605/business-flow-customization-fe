import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TenantProfileComponent } from "./tenant-profile/tenant-profile.component";

const routes : Routes = [
  {
    path: '',
    component: TenantProfileComponent,
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TenantRoutingModule {}