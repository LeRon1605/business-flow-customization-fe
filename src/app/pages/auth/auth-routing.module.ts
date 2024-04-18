import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./login-form/login-form.component";
import { ResetPasswordFormComponent } from "./reset-password-form/reset-password-form.component";
import { ChangePasswordFormComponent } from "./change-password-form/change-password-form.component";
import { AuthComponent } from "./auth.component";
import { RegisterFormComponent } from "./register-form/register-form.component";

const routes : Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent,
      },
      {
        path: 'register',
        component: RegisterFormComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordFormComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}