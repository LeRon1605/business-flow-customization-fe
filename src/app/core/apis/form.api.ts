import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { CreateFormRequestDto, FormDto, FormVersionDto, PagedResult, SubmissionDto, SubmissionFieldModel, SubmissionFilterRequestDto, SubmissionModel } from "../schemas";
import { HttpParams } from "@angular/common/http";

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

    submitForm(spaceId: number, data: SubmissionModel) {
        return this.http.post<{ id: number }>(`${this.API_END_POINTS.SUBMISSION}/spaces/${spaceId}/submissions`, data);
    }

    getSpaceSubmissions(data: SubmissionFilterRequestDto) {
        let params: HttpParams = new HttpParams();

        if (data.page) {
            params = params.append('page', data.page);
        }

        if (data.size) {
            params = params.append('size', data.size);
        }
        
        if (data.formVersionId) {
            params = params.append('formVersionId', data.formVersionId);
        }
        
        return this.http.get<PagedResult<SubmissionDto>>(`${this.API_END_POINTS.SUBMISSION}/spaces/${data.spaceId}/submissions`, {
            params
        });;
    }

    getSubmissionById(spaceId: number, versionId: number, submissionId: number) {
        return this.http.get<SubmissionDto>(`${this.API_END_POINTS.SUBMISSION}/spaces/${spaceId}/forms/${versionId}/submissions/${submissionId}`);
    }

    getBusinessFlowBlockForm(blockId: string) {
        return this.http.get<FormDto>(`${this.API_END_POINTS.SUBMISSION}/forms/business-flows/${blockId}`);
    }

    updateSubmissionField(submissionId: number, field: SubmissionFieldModel) {
        return this.http.put(`${this.API_END_POINTS.SUBMISSION}/submissions/${submissionId}/fields`, { field });
    }
    
    getExecutionSubmission(executionId: number) {
        return this.http.get<SubmissionDto>(`${this.API_END_POINTS.SUBMISSION}/submissions/executions/${executionId}`);
    }
}