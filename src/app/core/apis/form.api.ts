import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { FormDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class FormApiService extends BaseApiService {

    getLatestSpaceVersion(spaceId: number) {
        return this.http.get<FormDto>(`${this.API_END_POINTS.SUBMISSION}/spaces/${spaceId}/forms/latest`);
    }
}