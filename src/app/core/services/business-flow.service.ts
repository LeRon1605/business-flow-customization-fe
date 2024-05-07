import { Injectable } from "@angular/core";
import { BusinessFlowApiService } from "../apis/business-flow.api";
import { BusinessFlowDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class BusinessFlowService {

    constructor(
        private businessFlowApiService: BusinessFlowApiService
    ) { }

    validate(data: BusinessFlowDto) {
        return this.businessFlowApiService.validate(data);
    }

    getSpaceBusinessFlowVersions(spaceId: number) {
        return this.businessFlowApiService.getSpaceBusinessFlowVersions(spaceId);
    }

    getBusinessFlow(spaceId: number, versionId: number) {
        return this.businessFlowApiService.getBusinessFlow(spaceId, versionId);
    }

    addSpaceBusinessFlow(spaceId: number, data: BusinessFlowDto) {
        return this.businessFlowApiService.addBusinessFlow(spaceId, data);
    }
}