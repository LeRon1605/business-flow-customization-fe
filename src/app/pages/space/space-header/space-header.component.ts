import { Component, Input, OnInit } from '@angular/core';
import { BasicUserInfo, SpaceDetailDto } from '../../../core/schemas';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpaceService } from '../../../core/services/space.service';
import { MatDialog } from '@angular/material/dialog';
import { SpaceMemberComponent } from '../space-member/space-member.component';
import { ToastService } from '../../../core/services/toast.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../core/services';

@Component({
  selector: 'app-space-header',
  templateUrl: 'space-header.component.html',
})
export class SpaceHeaderComponent implements OnInit {
  @Input()
  space?: SpaceDetailDto;
  displayDialog: boolean = false;
  spaceForm: FormGroup;
  tenantUsers: BasicUserInfo[] = [];

  items: MenuItem[] = [
    {
      label: 'Tùy chỉnh',
      items: [
        {
          label: 'Chỉnh sửa',
          icon: PrimeIcons.PENCIL,
          command: () => this.showEditDialog(),
        },
        { label: 'Xóa', 
          icon: PrimeIcons.TRASH,
          command: () => this.deleteSpace() 
        },
      ]
    }
  ];

  constructor(
    private fb: FormBuilder,
    private spaceService: SpaceService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private router: Router,
    private userStorageService: UserStorageService
  ) {
    this.spaceForm = this.fb.group({
      name: [''],
      description: [''],
      color: [''],
    });
  }

  ngOnInit(): void {
    if (this.space) {
      this.spaceForm.patchValue(this.space);
    }

    this.userStorageService.currentUser.subscribe(x => {
      if (x)
        this.tenantUsers = x.tenantUsers;
    })
  }

  user(id: string) : BasicUserInfo | undefined {
    return this.tenantUsers.find(x => x.id == id);
  }

  showEditDialog() {
    if (this.space) {
      this.spaceForm.patchValue(this.space);
    }
    this.displayDialog = true;
  }

  deleteSpace()
  {
    if(this.space) {
      this.spaceService.deleteSpace(this.space!.id).subscribe(
        ()=> {
          this.toastService.success("Xóa thành công");
          this.router.navigate(['/home']);
        }, error => {
          this.toastService.error('Đã xảy ra lỗi khi thêm thành viên!');
        }
      )
    }
  }

  onSubmit() {
    if (this.spaceForm.valid && this.space?.id !== undefined) {
      const updatedSpace = this.spaceForm.value;
      const spaceId = this.space.id;
      this.spaceService.updateSpaceBasicInfo(spaceId, updatedSpace).subscribe(
        (response) => {
          if (this.space) {
            this.space.name = updatedSpace.name;
            this.space.color = updatedSpace.color;
            this.space.description = updatedSpace.description;
          }

          this.toastService.success('Cập nhật thông tin thành công');
          this.displayDialog = false;
          this.spaceService.load();
        },
        (error) => {
          this.toastService.error('Có lỗi xảy ra, vui lòng thử lại');
        }
      );
    } else {
      console.error('Space ID is undefined or form is invalid');
    }
  }

  openDialogMember() {
    if (this.space?.id !== undefined) {
      const dialogRef = this.dialog.open(SpaceMemberComponent, {
        data: { spaceId: this.space.id },
        panelClass: 'z-[2000]'
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Dialog closed with result:', result);
        }
      });
    } else {
      console.error('Space ID is undefined');
    }
  }

  get valid(): boolean {
    return this.spaceForm.valid;
  }
}
