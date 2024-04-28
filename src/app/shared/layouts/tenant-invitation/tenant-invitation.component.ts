import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DatatableOption } from "../../components/datatable/datatable.component";
import { TenantService, ToastService } from "../../../core/services";
import { DatePipe } from "@angular/common";
import { RoleService } from "../../../core/services/role.service";
import { DropDownItem } from "../../components/form-controls/dropwdown-input/dropdown-input.component";
import { TenantInvitationCreateDto, TenantInvitationStatusStr } from "../../../core/schemas";
import { finalize } from "rxjs";

@Component({
    selector: 'app-tenant-invitation',
    templateUrl: './tenant-invitation.component.html'
})
export class TenantInvitationComponent implements OnInit {
    
    currentPage = 1;
    search = '';
    loading = false;
    inviteMemberVisibile: boolean = false;
    roleDropDownItems!: DropDownItem[];

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl('', [Validators.required])
    });

    dataTable: DatatableOption = {
        title: 'Danh sách lời mời',
        rows: 5,
        columns: [
            {
                name: 'Email',
                field: 'email'
            },
            {
                name: 'Vai trò',
                field: 'role.name',
                generate: x => x.role.name
            },
            {
                name: 'Trạng thái',
                field: 'status',
                generate: x => TenantInvitationStatusStr[x.status]
            },
            {
                name: 'Ngày mời',
                field: 'createdAt',
                generate: x => new DatePipe('vi_VN').transform(x.createdAt, 'dd/MM/yyyy')
            }
        ]
    }

    constructor(
        private tenantService: TenantService,
        private roleService: RoleService,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        this.loadData();
        this.roleService.getDropDownItems().subscribe(x => this.roleDropDownItems = x.filter(r => r.text != 'Chủ doanh nghiệp'));
    }

    onInviteMember() {
        if (this.form.invalid)
            return;

        const data: TenantInvitationCreateDto = {
            email: <string>this.form.value.email,
            roleId: <string>this.form.value.role
        };

        this.loading = true;
        this.form.disable();

        this.tenantService.inviteMember(data).pipe(
            finalize(() => {
                this.loading = false;
                this.form.enable();
            })
        ).subscribe(() => {
            this.toastService.success("Mời thành viên thành công");
            this.form.reset();
            this.loadData();
        })
    }

    onPageChange(page: number) {
        this.currentPage = page;
        this.loadData();
    }

    onSearchChange(search: string) {
        this.search = search;
        this.loadData();
    }

    loadData() {
        this.tenantService.getCurrentTenantInvitation(this.currentPage, this.dataTable.rows, this.search)
            .subscribe(x => this.dataTable.pagedResult = x);
    }
}