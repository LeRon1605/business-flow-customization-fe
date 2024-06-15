import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TenantComponent } from "./tenant.component";
import { ListUserComponent } from "./tenant-list-user/tenant-list-user.component";
import { UserDetailComponent } from "./tenant-user-detail/tenant-user-detail.component";

const routes : Routes = [
  {
    path: '',
    component: TenantComponent,
    children: [
      {
        path: 'list-user',
        component: ListUserComponent
      },
      {
        path: 'tenant-user-detail/:id',
        component: UserDetailComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TenantRoutingModule {}