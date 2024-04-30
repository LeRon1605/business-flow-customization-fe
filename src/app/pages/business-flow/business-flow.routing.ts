import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BusinessFlowComponent } from "./business-flow.component";

const routes : Routes = [
  {
    path: '',
    component: BusinessFlowComponent,
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BusinessFlowRoutingModule {}