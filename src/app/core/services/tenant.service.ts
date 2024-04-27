import { Injectable } from "@angular/core";
import { TenantApiService } from "../apis/tenant.api";
import { InitAccountTenantInvitationRequestDto, TenantInvitationCreateDto, UpdateTenantDto } from "../schemas";

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

    getCurrentTenantInvitation(page: number, size: number, search: string) {
        return this.tenantApiService.getInvitation(page, size, search);
    }

    inviteMember(data: TenantInvitationCreateDto) {
        return this.tenantApiService.inviteMember(data);
    }

    acceptInvitation(token: string) {
        return this.tenantApiService.acceptInvitation(token);
    }

    initAccount(data: InitAccountTenantInvitationRequestDto) {
        return this.tenantApiService.initAccount(data);
    }
}