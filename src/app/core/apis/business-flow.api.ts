import { Injectable } from "@angular/core";
import { BaseApiService } from "./base.api";
import { ValidateBusinessFlowDto, ValidateBusinessFlowResponseDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class BusinessFlowApiService extends BaseApiService {

    validate(data: ValidateBusinessFlowDto) {
        return this.http.post<ValidateBusinessFlowResponseDto[]>(this.API_END_POINTS.VALIDATE_BUSINESS_FLOW, data);
    }
}