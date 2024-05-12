import { Injectable } from "@angular/core";
import { FormApiService } from "../apis/form.api";
import { CreateFormRequestDto } from "../schemas";

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
}