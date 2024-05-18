import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BusinessFlowBuilderService } from "../business-flow-builder/business-flow-builder.service";
import { Node } from "@kr0san89/ngx-graph";
import { BasicUserInfo, BusinessFlowOutComeDto, FormElementDto } from "../../../core/schemas";
import { cloneDeep } from 'lodash';
import { UserStorageService } from "../../../core/services";

@Component({
    selector: 'app-business-flow-block-detail',
    styleUrl: 'business-flow-block-detail.component.scss',
    templateUrl: 'business-flow-block-detail.component.html'
})
export class BusinessFlowBlockDetailComponent implements OnInit {

    node?: Node;
    visible: boolean = false;
    outComeDialogVisible: boolean = false;
    createFormElementDialogVisible: boolean = false;
    createOutComeDialogVisible: boolean = false;
    selectedOutComeId?: string;
    form = new FormGroup({
        name: new FormControl('', [Validators.required])
    });
    selectedElementIndex?: number;
    selectedElement?: FormElementDto;
    draggedElement?: FormElementDto;

    @Input()
    spaceId?: number;

    tenantUsers: BasicUserInfo[] = [];

    constructor(
        private businessFlowBuilderService: BusinessFlowBuilderService,
        private userStorageService: UserStorageService
    ) { }

    ngOnInit(): void {
        this.userStorageService.currentUser.subscribe(x => {
            if (x)
                this.tenantUsers = x.tenantUsers;
        });

        this.businessFlowBuilderService.selectedNode$.subscribe(x => {
            if (x.data.type == 1)
                return;
            
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

    onDropOnElement($event: DragEvent, index: number) {
        if (this.draggedElement != undefined) {
            this.node!.data.elements.splice(this.node!.data.elements.indexOf(this.draggedElement), 1);
            this.node!.data.elements.splice(index, 0, this.draggedElement);

            this.draggedElement = undefined;
        }
    }

    onElementDragStart(element: FormElementDto) {
        this.draggedElement = element;
    }

    onSaveElement(data: FormElementDto) {
        if (!this.node?.data.elements) {
            this.node!.data.elements = [];
        }

        if (this.selectedElementIndex != undefined) {
            this.node!.data.elements[this.selectedElementIndex] = data;
            this.selectedElementIndex = undefined;
            this.selectedElement = undefined;
        } else {   
            this.node?.data.elements.push(data);
        }

        this.createFormElementDialogVisible = false;
    }

    onDeleteElement() {
        if (this.selectedElementIndex != undefined) {
            this.node!.data.elements.splice(this.selectedElementIndex, 1);
            this.selectedElementIndex = undefined;
            this.selectedElement = undefined;
        }

        this.createFormElementDialogVisible = false;
    }

    onEditElement(element: FormElementDto, index: number) {
        this.selectedElementIndex = index;
        this.selectedElement = cloneDeep(element);
        this.createFormElementDialogVisible = true;
    }

    onAddWork() {
        if (!this.node?.data.works) {
            this.node!.data.works = [];
        }

        this.node?.data.works.push({ name: 'Tên công việc ' })
    }
}