import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BusinessFlowBuilderService } from "../business-flow-builder/business-flow-builder.service";
import { Node } from "@kr0san89/ngx-graph";
import { BusinessFlowOutComeDto } from "../../../core/schemas";
import { cloneDeep } from 'lodash';

@Component({
    selector: 'app-business-flow-block-detail',
    templateUrl: 'business-flow-block-detail.component.html'
})
export class BusinessFlowBlockDetailComponent implements OnInit {

    node?: Node;
    visible: boolean = false;
    outComeDialogVisible: boolean = false;
    createOutComeDialogVisible: boolean = false;
    selectedOutComeId?: string;
    form = new FormGroup({
        name: new FormControl('', [Validators.required])
    });

    constructor(
        private businessFlowBuilderService: BusinessFlowBuilderService
    ) { }

    ngOnInit(): void {
        this.businessFlowBuilderService.selectedNode$.subscribe(x => {
            const clonedNode = cloneDeep(x);

            this.node = clonedNode;
            this.visible = true;
            this.form.patchValue({
                name: this.node.label
            });
        });
    }

    onDeleteNode() {
        if (this.node) {
            this.businessFlowBuilderService.deleteNode(this.node.id);
            this.visible = false;
        }
    }

    onUpdateNode() {
        if (this.node && this.form.valid) {
            this.node.label = <string>this.form.value.name;

            this.businessFlowBuilderService.updateNode(this.node);
            this.visible = false;

            this.form.reset();
            this.node = undefined;
        }
    }

    onOutComeSelect(outComeId: string) {
        this.outComeDialogVisible = true;
        this.selectedOutComeId = outComeId;
    }

    onDeleteOutCome(outComeId: string) {
        const index = this.node?.data.outComes.findIndex((x: any) => x.id == outComeId);
        if (index >= 0) {
            this.node?.data.outComes.splice(index, 1);
        }

        this.outComeDialogVisible = false;
    }

    onSaveOutCome(data: BusinessFlowOutComeDto) {
        const outCome = this.node?.data.outComes.find((x: any) => x.id == data.id);
        if (outCome) {
            outCome.name = data.name;
            outCome.color = data.color;
            this.outComeDialogVisible = false;
        } else {
            this.node?.data.outComes.push(data);
            this.createOutComeDialogVisible = false;
        }
    }
}