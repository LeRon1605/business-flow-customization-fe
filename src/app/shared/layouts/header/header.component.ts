 import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, ToastService, UserStorageService } from '../../../core/services';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Tenant, UserInfo } from '../../../core/schemas/user.schema';
import { FormControl, FormGroup } from '@angular/forms';
import { UserPanelComponent } from '../../components';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @ViewChild('userPanel')
  userPanelComponent!: UserPanelComponent;

  items: MenuItem[] | undefined;
  user!: UserInfo | null;
  tenant!: Tenant | null | undefined;
  userPanelVisible: boolean = false;
  form: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  constructor(
    private authService: AuthService, 
    private userStorage: UserStorageService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userStorage.currentUser.subscribe(user => {
      this.user = user;
      this.tenant = this.userStorage.getCurrentTenant();
    });

    this.items = [
      {
        label: 'Thông tin cá nhân',
        icon: PrimeIcons.USER,
        command: () => {
          this.userPanelVisible = true;
        }
      },
      {
        label: 'Đăng xuất',
        icon: PrimeIcons.SIGN_OUT,
        command: ($event) => {
          this.authService.signOut();
          this.router.navigate(['/auth/login']);
        }
      },
    ]

    if (this.tenant) {
      this.items.unshift({
        label: this.tenant?.name,
        customIcon: this.tenant.avatarUrl,
        items: this.user?.tenants.map(x => {
          return {
            label: x.name,
            customIcon: x.avatarUrl,
            disabled: x.id == this.user?.tenantId,
            command: () => {
              this.authService.exchangeTenant(x.id)
                .subscribe(() => {
                  this.toastService.success(`Chuyển sang doanh nghiệp ${x.name} thành công!`);
                  location.reload();
                });
            }
          }
        })
      });
    }
  }

  onSaveProfile() {
    this.userPanelComponent.updateProfile();
  }
}
