import { Injectable } from "@angular/core";
import { TenantApiService } from "../apis/tenant.api";
import { UpdateTenantDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class TenantService {

    constructor(private tenantApiService: TenantApiService) {

    }

    getCurrentTenant() {
        return this.tenantApiService.getTenantInfo();
    }

    updateCurrentTenant(data: UpdateTenantDto) {
        return this.tenantApiService.updateTenantInfo(data);
    }
}