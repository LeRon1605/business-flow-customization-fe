import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { confirmPasswordValidator } from "../../../core/validators/confirm-password.validator";
import { AuthService, ToastService } from "../../../core/services";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs";
import { ResetProfilePasswordDto } from "../../../core/schemas/auth.schema";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {

  loading = false;
  form = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, confirmPasswordValidator);

  constructor(
    private toastService: ToastService,
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  async onSubmit() {
    if (this.form.invalid)
      return;

    const data : ResetProfilePasswordDto = {
        currentPassword: <string>this.form.value.currentPassword,
        newPassword: <string>this.form.value.password,
    };
    
    this.loading = true;
    this.form.disable();

    this.authService.resetProfilePassword(data)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.form.reset();
          this.form.enable();
        })
      )
      .subscribe(() => {
        this.toastService.success('Thay đổi mật khẩu thành công');
      });
  }
}