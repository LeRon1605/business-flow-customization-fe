import { Component } from "@angular/core";
import { BusinessFlowBuilderService } from "./business-flow-builder/business-flow-builder.service";

@Component({
    selector: 'app-business-flow',
    providers: [
        BusinessFlowBuilderService
    ],
    styleUrl: 'business-flow.component.scss',
    templateUrl: 'business-flow.component.html'
})
export class BusinessFlowComponent {
    businessFlowBlockDetailVisible: boolean = true;

    get valid() {
        return this.businessFlowBuilderService.valid; 
    }

    get data() {
        return this.businessFlowBuilderService.data;
    }

    constructor(
        private businessFlowBuilderService: BusinessFlowBuilderService
    ) { }
}