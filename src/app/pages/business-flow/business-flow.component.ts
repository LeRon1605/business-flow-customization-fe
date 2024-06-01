import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BusinessFlowBuilderService } from "./business-flow-builder/business-flow-builder.service";
import { BusinessFlowBlockDto } from "../../core/schemas";
import { BusinessFlowService } from "../../core/services/business-flow.service";
import { ToastService } from "../../core/services";
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-business-flow',
    providers: [
        BusinessFlowBuilderService
    ],
    styleUrl: 'business-flow.component.scss',
    templateUrl: 'business-flow.component.html'
})
export class BusinessFlowComponent implements OnInit {

    @Input()
    createMode: boolean = true;

    @Input()
    spaceId?: number;

    @Output()
    businessFlowEditted = new EventEmitter<number>();

    private _versionId?: number;

    @Input()
    get versionId() : number | undefined {
        return this._versionId;
    }

    set versionId(val: number | undefined) {
        this._versionId = val;

        if (!this.createMode && this.spaceId && this.versionId) {
            this.businessFlowBuilderService.loadEditableMode(this.spaceId, this.versionId);
            return;   
        }
    }

    businessFlowBlockDetailVisible: boolean = true;

    get valid() {
        return this.businessFlowBuilderService.valid; 
    }

    get data() {
        return this.businessFlowBuilderService.data;
    }

    constructor(
        private businessFlowBuilderService: BusinessFlowBuilderService,
        private businessFlowService: BusinessFlowService,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        if (this.createMode) {
            const blocks : BusinessFlowBlockDto[] = [
                {
                  id: uuidv4(),
                  name: 'Bắt đầu',
                  type: 1,
                  personInChargeIds: [],
                  tasks: []
                }
            ];
        
            this.businessFlowBuilderService.load(blocks, []);
        }
    }

    save() {
        if (this.spaceId && this.versionId && !this.createMode) {
            if (!this.valid) {
                this.toastService.error('Dữ liệu không hợp lệ');
            } else {
                this.businessFlowService.addSpaceBusinessFlow(this.spaceId, this.data)
                    .subscribe(x => {
                        this.businessFlowEditted.emit(x.id);
                        this.toastService.success('Cập nhật quy trình nghiệp vụ thành công');
                        this.businessFlowBuilderService.loadEditableMode(this.spaceId!, x.id);
                    });
            }
        }
    }
}