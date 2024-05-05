import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { BusinessFlowDto, ValidateBusinessFlowResponseDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class BusinessFlowApiService extends BaseApiService {

    validate(data: BusinessFlowDto) {
        return this.http.post<ValidateBusinessFlowResponseDto[]>(this.API_END_POINTS.VALIDATE_BUSINESS_FLOW, data);
    }
}