// list-user.component.ts
import { Component, OnInit } from '@angular/core';
import { UserBasicDto } from '../../../core/schemas/user.schema';
import { PagedResult } from '../../../core/schemas/paged.schema';
import { DatatableOption } from '../../../shared/components/datatable/datatable.component';
import { MatDialog } from '@angular/material/dialog';
import { TenantService } from '../../../core/services';
import { UserDetailComponent } from '../tenant-user-detail/tenant-user-detail.component';

@Component({
  selector: 'app-tenant-list-user',
  templateUrl: './tenant-list-user.component.html'
})
export class ListUserComponent implements OnInit {

  currentPage = 1;
  search = '';
  students!: PagedResult<UserBasicDto>;

  dataTable: DatatableOption = {
    title: 'Danh sách người dùng',
    rows: 13,
    columns: [
      {
        name: 'Họ và tên',
        field: 'userName'
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
  }

  constructor(
    private tenantService: TenantService, 
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadData();
  }

  onSearchChange(search: string): void {
    this.search = search;
    this.loadData();
  }

  loadData(): void {
    this.tenantService.getAllUsers(this.currentPage, this.dataTable.rows, this.search)
      .subscribe((result) => {
        this.dataTable.pagedResult = result;
      });
  }

  onUserSelected(user: UserBasicDto): void {
    const dialogRef = this.dialog.open(UserDetailComponent, 
      {
      data: { id: user.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();  
      }
    });
  }
}
