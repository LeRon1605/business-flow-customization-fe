import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BusinessFlowBuilderService } from "../business-flow-builder/business-flow-builder.service";
import { Edge, Node } from "@kr0san89/ngx-graph";

@Component({
    selector: 'app-business-flow-branch-detail',
    templateUrl: 'business-flow-branch-detail.component.html'
})
export class BusinessFlowBranchDetailComponent implements OnInit {

    @Input() 
    link?: Edge;

    @Output()
    deleteBranch = new EventEmitter<string>();

    @Output()
    saveBranch = new EventEmitter<string>();

    fromNode?: Node;
    toNode?: Node;

    selectedOutComeId?: string;

    constructor(
        private businessFlowBuilderService: BusinessFlowBuilderService
    ) { }

    ngOnInit(): void {
        if (this.link) {
            this.selectedOutComeId = this.link.data.outCome.id;
            this.fromNode = this.businessFlowBuilderService.getNode(this.link.source);
            this.toNode = this.businessFlowBuilderService.getNode(this.link.target);
        }
    }

    onDeleteBranch() {
        if (this.link) {
            this.deleteBranch.emit(this.link.id);
        }
    }

    onSaveBranch() {
        if (this.selectedOutComeId) {  
            this.saveBranch.emit(this.selectedOutComeId);
        }
    }
}