import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { BusinessFlowBlockOutComeDto, BusinessFlowDto, BusinessFlowVersionDetailDto, BusinessFlowVersionDto, SubmissionExecutionBusinessFlowDto, SubmissionExecutionTaskStatus, ValidateBusinessFlowResponseDto } from "../schemas";

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

    getSubmissionExecution(submissionId: number) {
        return this.http.get<SubmissionExecutionBusinessFlowDto[]>(`${this.API_END_POINTS.BUSINESS_FLOW}/submissions/${submissionId}`);
    }

    selectOutCome(submissionId: number, outComeId: string) {
        return this.http.post(`${this.API_END_POINTS.BUSINESS_FLOW}/submissions/${submissionId}/outcomes`, { outComeId });
    }

    updateTaskStatus(executionId: number, taskId: number, status: SubmissionExecutionTaskStatus) {
        return this.http.put(`${this.API_END_POINTS.BUSINESS_FLOW}/executions/${executionId}/tasks/${taskId}`, { status });
    }

    getOutComes(spaceId: number) {
        return this.http.get<BusinessFlowBlockOutComeDto[]>(`${this.API_END_POINTS.SPACE}/${spaceId}/business-flows/out-comes`);
    }
}