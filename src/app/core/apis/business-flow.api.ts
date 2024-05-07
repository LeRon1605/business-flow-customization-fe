import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { BusinessFlowDto, BusinessFlowVersionDetailDto, BusinessFlowVersionDto, ValidateBusinessFlowResponseDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class BusinessFlowApiService extends BaseApiService {

    validate(data: BusinessFlowDto) {
        return this.http.post<ValidateBusinessFlowResponseDto[]>(this.API_END_POINTS.VALIDATE_BUSINESS_FLOW, data);
    }

    getSpaceBusinessFlowVersions(spaceId: number) {
        return this.http.get<BusinessFlowVersionDto[]>(`${this.API_END_POINTS.SPACE}/${spaceId}/business-flows`);
    }

    getBusinessFlow(spaceId: number, versionId: number) {
        return this.http.get<BusinessFlowVersionDetailDto>(`${this.API_END_POINTS.SPACE}/${spaceId}/business-flows/${versionId}`);
    }

    addBusinessFlow(spaceId: number, data: BusinessFlowDto) {
        return this.http.put<{ id: number }>(`${this.API_END_POINTS.SPACE}/${spaceId}/business-flows`, data);
    }
}