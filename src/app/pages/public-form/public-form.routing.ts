import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicFormComponent } from './public-form.component';
import { PublicFormTrackingComponent } from './public-form-tracking/public-form-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: PublicFormComponent
  },
  {
    path: 'tracking',
    component: PublicFormTrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicFormRoutingModule { }
