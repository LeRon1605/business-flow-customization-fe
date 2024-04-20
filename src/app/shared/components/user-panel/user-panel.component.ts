import { Component, Input, OnInit } from "@angular/core";
import { UserInfo, UserUpdateDto } from "../../../core/schemas/user.schema";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService, ToastService } from "../../../core/services";
import { finalize } from "rxjs";

@Component({
    selector: 'app-user-panel',
    templateUrl: './user-panel.component.html'
})
export class UserPanelComponent implements OnInit {

    @Input()
    user!: UserInfo;

    form!: FormGroup;
    resetPasswordPanelVisible = false;

    get disabled() {
        return this.form.invalid || this.form.disable;
    }

    constructor(
        private authService: AuthService,
        private toastService: ToastService,
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            fullName: new FormControl(this.user.fullName, [Validators.required]),
            email: new FormControl(this.user.email, [Validators.required]),
            avatarUrl: new FormControl(this.user.avatarUrl, [Validators.required])
        });

        this.form.controls['email'].disable();
    }

    updateProfile() {
        if (this.form.invalid)
            return;

        const data : UserUpdateDto = {
            fullName: this.form.value.fullName,
            avatarUrl: this.form.value.avatarUrl
        };

        this.form.disable();

        this.authService.updateProfile(data)
            .pipe(
                finalize(() => {
                    this.form.enable();
                })
            )
            .subscribe(() => {
                this.toastService.success('Cập nhật thông tin cá nhân thành công');
            });
    }
}