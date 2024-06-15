import { Component, Input, OnInit } from '@angular/core';
import { SpaceDetailDto } from '../../../core/schemas';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpaceService } from '../../../core/services/space.service';
import { MatDialog } from '@angular/material/dialog';
import { SpaceMemberComponent } from '../space-member/space-member.component';
import { ToastService } from '../../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-space-header',
  templateUrl: 'space-header.component.html',
})
export class SpaceHeaderComponent implements OnInit {
  @Input()
  space?: SpaceDetailDto;
  displayDialog: boolean = false;
  spaceForm: FormGroup;

  items: MenuItem[] = [
    {
      label: 'Chỉnh sửa',
      icon: PrimeIcons.PENCIL,
      command: () => this.showEditDialog(),
    },
    { label: 'Xóa', icon: PrimeIcons.TRASH },
  ];

  constructor(
    private fb: FormBuilder,
    private spaceService: SpaceService,
    private dialog: MatDialog,
    private toastService: ToastService
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
  }

  showEditDialog() {
    if (this.space) {
      this.spaceForm.patchValue(this.space);
    }
    this.displayDialog = true;
  }

  onSubmit() {
    if (this.spaceForm.valid && this.space?.id !== undefined) {
      const updatedSpace = this.spaceForm.value;
      const spaceId = this.space.id;
      this.spaceService.updateSpaceBasicInfo(spaceId, updatedSpace).subscribe(
        (response) => {
          this.toastService.success('Cập nhật thông tin thành công');
          this.displayDialog = false;
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
        data: { spaceId: this.space.id }
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
