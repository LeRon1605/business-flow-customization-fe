import { Component } from '@angular/core';
import { AuthService, ToastService } from '../../../core/services';
import { finalize } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent {
  loading = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  })

  constructor(
    private authService: AuthService, 
    private toastService: ToastService
  ) { }

  onSubmit() {
    this.loading = true;
    this.form.disable();
    this.authService.requestForgetPassword(<string>this.form.value.email)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.form.enable();
        })
      )
      .subscribe((response) => this.toastService.success('Vui lòng kiểm tra email để tiếp tục.'),
    )
  }
}
