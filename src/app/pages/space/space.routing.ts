import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SpaceComponent } from "./space.component";
import { WorkSpaceComponent } from "./workspace/workspace.component";

const routes : Routes = [
  {
    path: '',
    component: SpaceComponent,
    children: [
      {
        path: ':id',
        component: WorkSpaceComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpaceRoutingModule {}