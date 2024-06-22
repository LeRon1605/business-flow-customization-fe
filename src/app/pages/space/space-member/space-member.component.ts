import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from "@angular/core";
import { BasicUserInfo, MemberInSpaceDto, PagedResult, SpaceMemberDetail, SpaceRoleDto } from "../../../core/schemas";
import { DatatableOption } from "../../../shared/components/datatable/datatable.component";
import { SpaceService } from "../../../core/services/space.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserStorageService } from "../../../core/services/user-storage.service";
import { ToastService } from "../../../core/services";
import { USERS } from "../../../core/constants";

@Component({
  selector: 'app-space-member',
  templateUrl: './space-member.component.html',
  styleUrls: ['./space-member.component.scss'],
})
export class SpaceMemberComponent implements OnInit {

  currentPage = 1;
  search = '';
  allMembers: MemberInSpaceDto[] = [];
  allMembersNotFilter: MemberInSpaceDto[] = [];
  tenantUsers: BasicUserInfo[] = [];
  spaceId: number;
  selectedUser: BasicUserInfo | undefined;
  selectedMember?: SpaceMemberDetail;
  displayDialog: boolean = false;
  roles: SpaceRoleDto[] = [];
  selectedRole?: number;

  dataTable: DatatableOption = {
    title: 'Danh sách thành viên',
    rows: 5,
    columns: [
      {
        name: 'Họ và tên',
        field: 'fullName',
        generate: x => this.user(x.id)?.fullName ?? ''
      },
      {
        name: 'Email',
        field: 'email',
        generate: x => this.user(x.id)?.email ?? ''
      },
      {
        name: 'Vai trò',
        field: 'role',
        generate: x => x.role.name
      }
    ]
  };

  constructor(
    private spaceService: SpaceService, 
    private dialogRef: MatDialogRef<SpaceMemberComponent>,
    private userStorageService: UserStorageService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: { spaceId: number }
  ) {
    this.spaceId = data.spaceId;
  }

  ngOnInit(): void {
    this.loadMembersInTenant();
    this.loadData(); 
    this.roles = [
      {id: 1, name: 'Trưởng dự án'},
      {id: 2, name: 'Người chỉnh sửa'},
      {id: 3, name: 'Người xem'}
    ];
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    if (this.spaceId !== undefined) {
      const skip = (this.currentPage - 1) * this.dataTable.rows;
      this.dataTable.pagedResult!.data = this.allMembers.slice(skip, skip + this.dataTable.rows);
    }
  }

  onSearchChange(search: string): void {
    this.search = search;
    if (this.spaceId !== undefined) {
      this.loadData();
    }
  }

  onUserSelected(user: MemberInSpaceDto): void {
    this.selectedMember = {
      user: this.user(user.id)!,
      role: user.role
    }
    this.displayDialog = true;
    this.selectedRole = user.role.id;
  }

  loadData(): void {
    this.spaceService.getListMembersInSpace(this.spaceId).subscribe(result => {
      this.allMembersNotFilter = result;
      this.allMembers = result.filter(x => this.tenantUsers.some(u => u.id == x.id && (this.search === '' || u.fullName.toLowerCase().includes(this.search.toLocaleLowerCase()))));

      this.dataTable.pagedResult = {
        data: this.allMembers.slice(0, this.dataTable.rows),
        total: result.length,
        totalPages: result.length / this.dataTable.rows
      };
    });
  }

  loadMembersInTenant(): void {
    this.userStorageService.currentUser.subscribe(x => {
      if (x) {
        this.tenantUsers = x.tenantUsers;
      }
    });
  }

  user(id: string) : BasicUserInfo | undefined {
    return this.tenantUsers.find(x => x.id == id);
  }

  get filteredUsers(): BasicUserInfo[] {
    if (this.allMembers.length > 0 && this.tenantUsers.length > 0) {
      return this.tenantUsers.filter(user => !this.allMembers.map(x => x.id).includes(user.id) && user.id != USERS.SYSTEM)
    }

    return [];
  }

  onAddMember(): void {
    if (this.selectedUser?.id && this.selectedUser?.id.trim() !== '') {
      this.spaceService.addMemberInSpace(this.spaceId, this.selectedUser.id).subscribe(() => {
        this.toastService.success('Thành viên đã được thêm vào không gian!');
        this.selectedUser = undefined;
        this.loadData(); 
      }, error => {
        this.toastService.error('Đã xảy ra lỗi khi thêm thành viên!');
      });
    } else {
      this.toastService.error('Vui lòng chọn một người dùng!');
    }
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

  onDeleteMemeber()
  {
    if (this.selectedMember)
      this.spaceService.deleteSpaceMember(this.spaceId, this.selectedMember!.user.id).subscribe(
        () => {
          this.toastService.success('Xóa thành viên thành công');
          this.displayDialog = false;
          this.loadData();
        },
        (error) => {
          this.toastService.error('Có lỗi xảy ra, vui lòng thử lại!');
        }
      );
  }

  onSaveChange()
  {
    if (this.selectedRole !== this.selectedMember!.role.id) {
      const info: MemberInSpaceDto = {
        id: this.selectedMember!.user.id,
        role: { id: this.selectedRole!,
                name: this.roles[this.selectedRole! - 1].name
         }
      };

    if (this.selectedMember && this.selectedRole !== this.selectedMember.role.id) {
      this.spaceService.updateRoleSpaceMember(this.spaceId, info)
        .subscribe(
          () => {
            this.toastService.success("Cập nhật thông tin thành công");
            this.displayDialog = false;
            this.loadData();
          },
          (error) => {
            this.toastService.error("Có lỗi xảy ra, vui lòng thử lại!");
          }
        );
      }
    }
  }
}
