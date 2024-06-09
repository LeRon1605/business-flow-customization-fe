import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { CreateSpaceDto, MemberInSpaceDto, PagedResult, SpaceDetailDto, SpaceDto, UpdateSpaceBasicInfoDto, UserBasicDto } from "../schemas";
import { HttpParams } from "@angular/common/http";
import { catchError } from "rxjs/internal/operators/catchError";
import { throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SpaceApiService extends BaseApiService {

    create(data: CreateSpaceDto) {
        return this.http.post<{ id: number }>(this.API_END_POINTS.SPACE, data);
    }

    getAll() {
        return this.http.get<SpaceDto[]>(this.API_END_POINTS.SPACE);
    }

    getById(id: number) {
        return this.http.get<SpaceDetailDto>(`${this.API_END_POINTS.SPACE}/${id}`);
    }

    updateSpaceBasicInfo(id: number, data: UpdateSpaceBasicInfoDto)
    {
        return this.http.put(`${this.API_END_POINTS.SPACE}/${id}/space-basic-info`, data);
    }

    getAllMembersInSpace(id: number)
    {
        return this.http.get<MemberInSpaceDto[]>(`${this.API_END_POINTS.SPACE}/${id}/space-members`);
        //return this.http.get<MemberInSpaceDto[]>(`http://localhost:5000/api/business-flow/spaces/${id}/space-members`);
    }

    addMemberInSpace(id: number, data: MemberInSpaceDto)
    {
        return this.http.post<MemberInSpaceDto>(`${this.API_END_POINTS.SPACE}/${id}/space-member`, data);
    }
}