import { Injectable } from "@angular/core";
import { FormApiService } from "../apis/form.api";
import { CreateFormRequestDto, SubmissionFilterRequestDto, SubmissionModel } from "../schemas";

@Injectable({ providedIn: 'root' })
export class FormService {

    constructor(
        private formApiService: FormApiService
    ) { }

    getSpaceVersions(spaceId: number) {
        return this.formApiService.getSpaceVersion(spaceId);
    } 
    
    getLatestVersion(spaceId: number) {
        return this.formApiService.getLatestSpaceVersion(spaceId);
    }

    getByVersion(spaceId: number, versionId: number) {
        return this.formApiService.getByVersion(spaceId, versionId);
    }

    saveForm(spaceId: number, data: CreateFormRequestDto) {
        return this.formApiService.saveForm(spaceId, data);
    }

    submitForm(spaceId: number, data: SubmissionModel) {
        return this.formApiService.submitForm(spaceId, data);
    }

    getSpaceSubmissions(data: SubmissionFilterRequestDto) {
        return this.formApiService.getSpaceSubmissions(data);
    }
}