import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { TenantDetailDto, UpdateTenantDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class TenantApiService extends BaseApiService {

    getTenantInfo() {
        return this.http.get<TenantDetailDto>(this.API_END_POINTS.TENANT_INFO);
    }

    updateTenantInfo(data: UpdateTenantDto) {
        return this.http.put(this.API_END_POINTS.TENANT_INFO, data);
    }
}