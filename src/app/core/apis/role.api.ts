import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { PagedResult, RoleDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class RoleApiService extends BaseApiService {

    getAllRoles() {
        return this.http.get<PagedResult<RoleDto>>(this.API_END_POINTS.ROLE);
    }
    
}