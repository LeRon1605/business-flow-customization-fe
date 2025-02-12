import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { CreateFormRequestDto, FormDto, FormVersionDto, InChargeSubmissionDto, PagedResult, SubmissionDto, SubmissionFieldModel, SubmissionFilterRequestDto, SubmissionModel, SubmittableFormDto } from "../schemas";
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

    submitFormExternal(token: string, data: SubmissionModel) {
        return this.http.post<{ id: number }>(`${this.API_END_POINTS.SUBMISSION}/submissions/external-submit`, {
            ...data,
            token
        });
    }

    getSpaceSubmissions(data: SubmissionFilterRequestDto) {        
        return this.http.post<PagedResult<SubmissionDto>>(`${this.API_END_POINTS.SUBMISSION}/spaces/${data.spaceId}/submissions/search`, data);;
    }

    getSubmissionById(spaceId: number, versionId: number, submissionId: number) {
        return this.http.get<SubmissionDto>(`${this.API_END_POINTS.SUBMISSION}/spaces/${spaceId}/forms/${versionId}/submissions/${submissionId}`);
    }

    getSubmitFormByTrackingToken(token: string) {
        return this.http.get<SubmissionDto>(`${this.API_END_POINTS.SUBMISSION}/submissions/tracking?token=${token}`);
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

    updateSubmission(submissionId: number, name: string) {
        return this.http.put(`${this.API_END_POINTS.SUBMISSION}/submissions/${submissionId}`, { name });
    }

    getSubmittableForms() {
        return this.http.get<SubmittableFormDto[]>(`${this.baseApiUrl}/forms`);
    }

    getInChargeSubmissions() {
        return this.http.get<InChargeSubmissionDto[]>(`${this.baseApiUrl}/submissions/in-charge-submissions`);
    }

    generateFormLink(spaceId: number)
    {
        return this.http.get<{ publicToken: string, isPublished: boolean }>(`${this.API_END_POINTS.SUBMISSION}/spaces/${spaceId}/get-public-link`);
    }

    getPublicForm(token: string)
    {
        return this.http.get<FormDto>(`${this.API_END_POINTS.FORMS}/public-form/${token}`);
    }

    deleteSubmitForm(submissionId: number) {
        return this.http.delete(`${this.API_END_POINTS.SUBMISSION}/submissions/${submissionId}`);
    }

    toggleShareStatus(spaceId: number, isShared: boolean) {
        return this.http.put(`${this.API_END_POINTS.SUBMISSION}/spaces/${spaceId}/publish-form`, isShared);
    }
}