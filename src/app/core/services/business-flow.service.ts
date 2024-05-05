import { Injectable } from "@angular/core";
import { BusinessFlowApiService } from "../apis/business-flow.api";
import { BusinessFlowDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class BusinessFlowService {

    constructor(
        private businessFlowApiService: BusinessFlowApiService
    ) { }

    validate(data: BusinessFlowDto) {
        return this.businessFlowApiService.validate(data);
    }

}