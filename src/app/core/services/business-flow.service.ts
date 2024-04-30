import { Injectable } from "@angular/core";
import { BusinessFlowApiService } from "../apis/business-flow.api";
import { ValidateBusinessFlowDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class BusinessFlowService {

    constructor(
        private businessFlowApiService: BusinessFlowApiService
    ) { }

    validate(data: ValidateBusinessFlowDto) {
        return this.businessFlowApiService.validate(data);
    }

}