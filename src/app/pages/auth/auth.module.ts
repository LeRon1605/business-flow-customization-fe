import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginFormComponent } from "./login-form/login-form.component";
import { CommonModule } from "@angular/common";
import { ChangePasswordFormComponent } from "./change-password-form/change-password-form.component";
import { ResetPasswordFormComponent } from "./reset-password-form/reset-password-form.component";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from "@angular/forms";
import { ServeSyncFormControlModule } from "../../shared/components/form-controls/form-control.module";
import { ServeSyncCommonModule } from "../../shared/components/common/common.module";

@NgModule({
    declarations: [
        AuthComponent,
        LoginFormComponent,
        ChangePasswordFormComponent,
        ResetPasswordFormComponent
    ],
    imports: [
        ReactiveFormsModule,
        AuthRoutingModule,
        CommonModule,
        InputTextModule,
        ButtonModule,
        ServeSyncFormControlModule,
        ServeSyncCommonModule
    ]
})
export class AuthModule {}