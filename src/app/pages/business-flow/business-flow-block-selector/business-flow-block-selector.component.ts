import { Component } from "@angular/core";
import { BusinessFlowBuilderService } from "../business-flow-builder/business-flow-builder.service";

@Component({
    selector: 'app-business-flow-block-selector',
    styleUrl: 'business-flow-block-selector.component.scss',
    templateUrl: 'business-flow-block-selector.component.html'
})
export class BusinessFlowBlockSelectorComponent { 

    constructor(
        private businessFlowBuilderService: BusinessFlowBuilderService
    ) { }
 
    onBlockClick(type: number) {
        this.businessFlowBuilderService.addNode(type);
    }

}