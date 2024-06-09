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

    getAllUsers(page: number, size: number, search: string)
    {
        return this.tenantApiService.getAllUser(page, size, search);
    }

    getUserById(id: string)
    {
        return this.tenantApiService.getUserById(id);
    }

    removeUser(id: string)
    {
        return this.tenantApiService.removeUser(id);
    /**
     * The function `updateSpaceBasicInfo` updates basic information for a space using the provided ID
     * and information.
     * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
     * space whose basic information needs to be updated.
     * @param {UpdateSpaceBasicInfoDto} info - The `info` parameter in the `updateSpaceBasicInfo`
     * function is of type `UpdateSpaceBasicInfoDto`. This parameter likely contains the updated basic
     * information for a space, such as its name, description, or other relevant details.
     * @returns The `updateSpaceBasicInfo` method is returning the result of calling the
     * `updateTenantInfo` method from the `tenantApiService` with the provided `id` and `info`
     * parameters.
     */
    }
}