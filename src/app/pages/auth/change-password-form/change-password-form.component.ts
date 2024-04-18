import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ToastService } from '../../../core/services';
import { finalize } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../../core/validators/confirm-password.validator';


@Component({
  selector: 'app-change-passsword-form',
  templateUrl: './change-password-form.component.html'
})
export class ChangePasswordFormComponent implements OnInit {

  token!: string;
  loading = false;
  form = new FormGroup({
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
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  async onSubmit() {
    if (this.form.invalid)
      return;
    
    this.loading = true;
    this.form.disable();

    this.authService.resetPassword(<string>this.form.value.password, this.token)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.form.reset();
          this.form.enable();
        })
      )
      .subscribe(() => {
        this.toastService.success('Thay đổi mật khẩu thành công');
        this.router.navigate(['/auth/login']);
      });
  }
}