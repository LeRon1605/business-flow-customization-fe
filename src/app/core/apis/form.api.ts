import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { CreateFormRequestDto, FormDto, FormVersionDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class FormApiService extends BaseApiService {

    getLatestSpaceVersion(spaceId: number) {
        return this.http.get<FormDto>(`${this.API_END_POINTS.SUBMISSION}/spaces/${spaceId}/forms/latest`);
    }

    getSpaceVersion(spaceId: number) {
        return this.http.get<FormVersionDto[]>(`${this.API_END_POINTS.SUBMISSION}/spaces/${spaceId}/form-versions`);
    }

    getByVersion(spaceId: number, versionId: number) {
        return this.http.get<FormDto>(`${this.API_END_POINTS.SUBMISSION}/spaces/${spaceId}/forms/${versionId}`);
    }

    saveForm(spaceId: number, data: CreateFormRequestDto) {
        return this.http.put<{ id: number }>(`${this.API_END_POINTS.SUBMISSION}/spaces/${spaceId}/forms`, data);
    }
}