// user-detail.component.ts
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserDto } from '../../../core/schemas';
import { TenantService, ToastService } from '../../../core/services';

@Component({
  selector: 'app-tenant-user-detail',
  templateUrl: './tenant-user-detail.component.html'
})
export class UserDetailComponent implements OnInit, OnDestroy {

  user?: UserDto;
  userSubscription!: Subscription;
  loading!: boolean;

  form = new FormGroup({
    avatar: new FormControl(),
    fullName: new FormControl(),
    email: new FormControl(),
    role: new FormControl(),
  });

  constructor(
    private tenantService: TenantService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.userSubscription = this.tenantService.getUserById(this.data.id).subscribe(
      user => {
        this.loading = false;
        if (user) {
          this.user = user;
          this.form.disable();
          this.syncFormData();
        }
      },
      error => {
        this.loading = false;
        console.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  syncFormData() {
    if (this.user) {
      this.form.patchValue({
        avatar: this.user.avatarUrl,
        fullName: this.user.userName,
        email: this.user.email,
        role: this.user.role,
      });
    }
  }

  onDelete() {
    if (this.user) {
      this.tenantService.removeUser(this.user.id).subscribe(() => {
        this.toastService.success("Người dùng đã được xóa!");
        this.dialogRef.close(true);
      }, error => {
        this.toastService.error("Có lỗi xảy ra, vui lòng thử lại!");
        console.error(error);
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
