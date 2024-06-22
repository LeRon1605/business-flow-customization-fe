import { Injectable } from "@angular/core";
import { BusinessFlowApiService } from "../apis/business-flow.api";
import { BusinessFlowDto, SubmissionExecutionTaskStatus } from "../schemas";

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

    getSubmissionExecution(submissionId: number) {
        return this.businessFlowApiService.getSubmissionExecution(submissionId);
    }

    selectOutCome(submissionId: number, outComeId: string) {
        return this.businessFlowApiService.selectOutCome(submissionId, outComeId);
    }

    updateExecutionTaskStatus(executionId: number, taskId: number, status: SubmissionExecutionTaskStatus) {
        return this.businessFlowApiService.updateTaskStatus(executionId, taskId, status);
    }

    getOutComes(spaceId: number) {
        return this.businessFlowApiService.getOutComes(spaceId);
    }
}