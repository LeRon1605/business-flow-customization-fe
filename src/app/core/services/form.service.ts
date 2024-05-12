import { Injectable } from "@angular/core";
import { FormApiService } from "../apis/form.api";

@Injectable({ providedIn: 'root' })
export class FormService {

    constructor(
        private formApiService: FormApiService
    ) { }
    
    getLatestVersion(spaceId: number) {
        return this.formApiService.getLatestSpaceVersion(spaceId);
    }
}