import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from "@angular/core";
import { BasicUserInfo, MemberInSpaceDto, PagedResult, SpaceRole } from "../../../core/schemas";
import { DatatableOption } from "../../../shared/components/datatable/datatable.component";
import { SpaceService } from "../../../core/services/space.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserStorageService } from "../../../core/services/user-storage.service";
import { ToastService } from "../../../core/services";

@Component({
  selector: 'app-space-member',
  templateUrl: './space-member.component.html',
  styleUrls: ['./space-member.component.scss']
})
export class SpaceMemberComponent implements OnInit {

  currentPage = 1;
  search = '';
  members: MemberInSpaceDto[] = [];
  tenantUsers: BasicUserInfo[] = [];
  combinedUsers: BasicUserInfo[] = [];
  filteredUsers: BasicUserInfo[] = [];
  form: FormGroup;
  spaceId: number;
  showUserList = false;
  selectedUserId: string = "";

  dataTable: DatatableOption = {
    title: 'Danh sách thành viên',
    rows: 5,
    columns: [
      {
        name: 'Họ và tên',
        field: 'fullName'
      },
      {
        name: 'Email',
        field: 'email'
      },
      {
        name: 'Vai trò',
        field: 'role'
      }
    ]
  };

  constructor(
    private spaceService: SpaceService, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SpaceMemberComponent>,
    private userStorageService: UserStorageService,
    private elementRef: ElementRef,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: { spaceId: number }
  ) {
    this.form = this.fb.group({
      input: ['', Validators.email]
    });

    this.spaceId = data.spaceId;
  }

  ngOnInit(): void {
    this.loadData(); 
    this.loadMembersInTenant();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    if (this.spaceId !== undefined) {
      this.loadData();
    }
  }

  onSearchChange(search: string): void {
    this.search = search;
    if (this.spaceId !== undefined) {
      this.loadData();
    }
  }

  loadData(): void {
    this.spaceService.getAllMembersInSpace(this.spaceId, this.currentPage, this.dataTable.rows, this.search)
      .subscribe((result: PagedResult<MemberInSpaceDto>) => {
        this.members = result.data;
        this.combineUsers();
        this.dataTable.pagedResult = {
          data: this.combinedUsers,
          total: result.total,
          totalPages: result.totalPages
        };
      });
  }

  loadMembersInTenant(): void {
    this.userStorageService.currentUser.subscribe(x => {
      if (x) {
        this.tenantUsers = x.tenantUsers;
        this.combineUsers();
      }
    });
  }

  combineUsers(): void {
    if (this.members.length > 0 && this.tenantUsers.length > 0) {
      this.combinedUsers = this.members.map(member => {
        const tenantUser = this.tenantUsers.find(user => user.id === member.id);
        if (tenantUser) {
          return {
            ...tenantUser,
            role: member.role.name
          };
        }
        return null;
      }).filter(user => user !== null) as BasicUserInfo[];
    }
  }

  onAddMember(): void {
    const userEmail = this.form.get('input')?.value;
    if (this.selectedUserId && this.selectedUserId.trim() !== '') {
      this.spaceService.addMemberInSpace(this.spaceId,this.selectedUserId).subscribe(() => {
        this.toastService.success('Thành viên đã được thêm vào không gian!');
        this.loadData(); 
      }, error => {
        this.toastService.error('Đã xảy ra lỗi khi thêm thành viên!');
      });
    } else {
      this.toastService.error('Vui lòng chọn một người dùng!');
    }
  }

  @ViewChild('userList') userList!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.userList.nativeElement.contains(event.target)) {
      this.showUserList = false;
    }
  }

  onSearch(): void {
    const inputValue = this.form.get('input')?.value.toLowerCase();
    this.filteredUsers = this.tenantUsers.filter(user => {
      return user.fullName.toLowerCase().includes(inputValue) || user.email.toLowerCase().includes(inputValue);
    });
    this.showUserList = true;
  }

  selectUser(user: BasicUserInfo): void {
    this.form.get('input')?.setValue(user.email);
    this.showUserList = false;
    this.selectedUserId = user.id;
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

  toggleUserListVisibility(): void {
    this.showUserList = !this.showUserList; 
  }


}