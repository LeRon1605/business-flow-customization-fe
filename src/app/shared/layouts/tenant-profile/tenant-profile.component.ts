import { Component, OnInit } from "@angular/core";
import { TenantDetailDto, UpdateTenantDto } from "../../../core/schemas";
import { TenantService, ToastService } from "../../../core/services";
import { finalize } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-tenant-profile',
    templateUrl: 'tenant-profile.component.html'
})
export class TenantProfileComponent implements OnInit {
    
    tenant!: TenantDetailDto;
    loadingTenant = true;

    get disabled() {
        return this.form.invalid || this.form.disabled;
    }

    form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        avatarUrl: new FormControl('', [Validators.required]),
        numberOfStaff: new FormControl(''),
        createdAt: new FormControl('')
    });

    constructor(
        private tenantService: TenantService,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        this.tenantService.getCurrentTenant()
            .pipe(
                finalize(() => this.loadingTenant = false)
            )
            .subscribe(x => {
                this.tenant = x;
                this.form.patchValue({
                    name: this.tenant.name,
                    avatarUrl: this.tenant.avatarUrl,
                    numberOfStaff: this.tenant.numberOfStaff,
                    createdAt: new DatePipe('vi_VN').transform(this.tenant.createdAt, 'dd/MM/yyyy')
                });

                this.form.controls['numberOfStaff'].disable();
                this.form.controls['createdAt'].disable();
            });
    }

    saveProfile() {
        if (this.form.invalid)
            return;

        const data : UpdateTenantDto = {
            name: this.form.value.name,
            avatarUrl: this.form.value.avatarUrl
        };

        this.form.disable();

        this.tenantService.updateCurrentTenant(data)
            .pipe(
                finalize(() => {
                    this.form.enable();
                })
            )
            .subscribe(() => {
                this.toastService.success('Cập nhật thông tin doanh nghiệp thành công');
            });
    }
}