import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService, ToastService } from "../../../core/services";
import { Router } from "@angular/router";
import { confirmPasswordValidator } from "../../../core/validators/confirm-password.validator";
import { RegisterRequestDto } from "../../../core/schemas/auth.schema";
import { finalize } from "rxjs";

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {

    loading = false;
    form = new FormGroup({
        fullName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email, Validators.required]),
        tenantName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required])
    }, confirmPasswordValidator);

    constructor(
        private toastService: ToastService,
        private authService: AuthService, 
        private router: Router
    ) { }

    onSubmit() {
        if (this.form.invalid)
            return;

        const data: RegisterRequestDto = {
            email: <string>this.form.value.email,
            fullName: <string>this.form.value.fullName,
            tenantName: <string>this.form.value.tenantName,
            password: <string>this.form.value.password
        };

        this.loading = true;
        this.form.disable();

        this.authService.register(data).pipe(
            finalize(() => {
                this.loading = false;
                this.form.enable();
            })
        ).subscribe(() => {
            this.toastService.success("Đăng ký tài khoản thành công");
            this.form.reset();
        })
    }
}