import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { AcceptTenantInvitationResponseDto, InitAccountTenantInvitationRequestDto, PagedResult, TenantDetailDto, TenantInvitationCreateDto, TenantInvitationDto, UpdateTenantDto } from "../schemas";
import { HttpParams } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class TenantApiService extends BaseApiService {

    getTenantInfo() {
        return this.http.get<TenantDetailDto>(this.API_END_POINTS.TENANT_INFO);
    }

    updateTenantInfo(data: UpdateTenantDto) {
        return this.http.put(this.API_END_POINTS.TENANT_INFO, data);
    }

    getInvitation(page: number, size: number, search: string) {
        let params: HttpParams = new HttpParams();
        params = params.append('page', page);
        params = params.append('size', size);

        if (search)
            params = params.append('search', search);

        return this.http.get<PagedResult<TenantInvitationDto>>(this.API_END_POINTS.TENANT_INVITATION, {
            params: params
        });
    }

    inviteMember(data: TenantInvitationCreateDto) {
        return this.http.post(this.API_END_POINTS.TENANT_INVITATION, data);
    }

    acceptInvitation(token: string) {
        return this.http.post<AcceptTenantInvitationResponseDto>(this.API_END_POINTS.ACCEPT_TENANT_INVITATION, {
            token
        });
    }

    initAccount(data: InitAccountTenantInvitationRequestDto) {
        return this.http.post(this.API_END_POINTS.INIT_TENANT_INVITATION_ACCOUNT, data);
    }
}