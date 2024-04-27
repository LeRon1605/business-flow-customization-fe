import { Component, Input } from "@angular/core";
import { confirmPasswordValidator } from "../../../core/validators/confirm-password.validator";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TenantService, ToastService } from "../../../core/services";
import { InitAccountTenantInvitationRequestDto } from "../../../core/schemas";
import { finalize } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-tenant-invitation-init-account',
    templateUrl: './tenant-invitation-init-account.component.html'
})
export class TenantInvitationInitAccountComponent { 

    @Input()
    token!: string;

    loading = false;
    form = new FormGroup({
        fullName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required])
    }, confirmPasswordValidator);

    constructor(
        private tenantService: TenantService,
        private toastService: ToastService,
        private router: Router
    ) { }

    onSubmit() {
        if (this.form.invalid)
            return;

        const data: InitAccountTenantInvitationRequestDto = {
            fullName: <string>this.form.value.fullName,
            token: this.token,
            password: <string>this.form.value.password
        };

        this.loading = true;
        this.form.disable();

        this.tenantService.initAccount(data).pipe(
            finalize(() => {
                this.loading = false;
                this.form.enable();
            })
        ).subscribe(() => {
            this.toastService.success("Đăng ký tài khoản thành công");
            this.form.reset();
            this.router.navigate(['/auth/login'])
        })
    }
}