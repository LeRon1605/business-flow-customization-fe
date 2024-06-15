import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicFormComponent } from './public-form.component';

const routes: Routes = [
  {
    path: '',
    component: PublicFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicFormRoutingModule { }
