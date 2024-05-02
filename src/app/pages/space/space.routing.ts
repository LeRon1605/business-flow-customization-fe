import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SpaceComponent } from "./space.component";
import { SpaceBuilderComponent } from "./space-builder/space-builder.component";

const routes : Routes = [
  {
    path: '',
    component: SpaceComponent,
    children: [
        {
            path: 'builder',
            component: SpaceBuilderComponent
        }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpaceRoutingModule {}