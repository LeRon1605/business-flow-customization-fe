import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, ToastService } from '../../../core/services';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loading = false;
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private toastService: ToastService,
    private authService: AuthService, 
    private router: Router
  ) { }

  onSubmit() {
    if (this.form.invalid)
      return;

    this.loading = true;
    this.form.disable();
    this.authService.signIn(<string>this.form.value.email, <string>this.form.value.password)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.form.enable();
        }
      ))
      .subscribe((userInfo) => {
        this.toastService.success('Đăng nhập thành công'); 

        this.router.navigate([this.authService.lastAuthenticatedPath || '/home']);
        this.authService.lastAuthenticatedPath = '/home';
      }
    )
  }
}