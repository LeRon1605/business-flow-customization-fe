import { Component, Inject, OnInit } from "@angular/core";
import { BasicUserInfo, MemberDto, MemberInSpaceDto, PagedResult, SpaceRole } from "../../../core/schemas";
import { DatatableOption } from "../../../shared/components/datatable/datatable.component";
import { SpaceService } from "../../../core/services/space.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserStorageService } from "../../../core/services/user-storage.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-space-member',
  templateUrl: './space-member.component.html'
})
export class SpaceMemberComponent implements OnInit {

  currentPage = 1;
  search = '';
  members: MemberInSpaceDto[] = [];
  tenantUsers: BasicUserInfo[] = [];
  combinedUsers: PagedResult<MemberDto> = { data: [], total: 0, totalPages: 0 };
  form: FormGroup;
  secondForm: FormGroup;
  spaceId: number;
  showSecondDiv = false; 
  tempUser?: MemberInSpaceDto;

  roles = [
    { id: SpaceRole.Manager, name: 'Manager' },
    { id: SpaceRole.Editor, name: 'Editor' },
    { id: SpaceRole.Viewer, name: 'Viewer' }
  ];

  dataTable: DatatableOption = {
    title: 'Danh sách người dùng',
    rows: 10,
    columns: [
      {
        name: 'Họ và tên',
        field: 'fullName'
      },
      {
        name: 'Vai trò',
        field: 'role'
      }
    ]
  }

  constructor(
    private spaceService: SpaceService, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SpaceMemberComponent>,
    private userStorageService: UserStorageService,
    @Inject(MAT_DIALOG_DATA) public data: { spaceId: number }
  ) {
    this.form = this.fb.group({
      input: ['', Validators.email] 
    });

    this.secondForm = this.fb.group({
      email: [{ value: '', disabled: true }, Validators.required],
      role: ['', Validators.required],
      message: ['']
    });

    this.spaceId = data.spaceId;
  }

  ngOnInit(): void {
    this.loadData(); 
    this.loadMembersInTenant();

    const inputControl = this.form.get('input');
    
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
    this.spaceService.getAllMembersInSpace(this.spaceId)
      .subscribe((result) => {
          this.members = result;
          this.combineUsers();
      });
  }

  loadMembersInTenant(): void {
    this.userStorageService.currentUser.subscribe(x => {
      if (x) {
        this.tenantUsers = x.tenantUsers;
      }
    });
  }

  combineUsers(): void {
    if (this.members.length > 0 && this.tenantUsers.length > 0) {
      this.combinedUsers.data = this.members.map(member => {
        const tenantUser = this.tenantUsers.find(user => user.id === member.id);
        if (tenantUser) {
          return {
            id: tenantUser.id,
            fullName: tenantUser.fullName,
            email: tenantUser.email,
            avatarUrl: tenantUser.avatarUrl,
            role: member.role.name,
          };
        }
        return null;
      }).filter(user => user !== null) as MemberDto[];
      this.combinedUsers.total = this.combinedUsers.data.length;
    }
  }

 

  onAddMember()
  {
    if (this.form.valid && this.form.get('input')?.value) {
      this.showSecondDiv = true;
    }
  }

  closeDialog(): void {
    this.dialogRef.close(true); 
  }

  onCancel()
  {

  }

  onConfirm()
  {

  }
}
