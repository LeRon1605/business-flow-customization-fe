import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MenuItem, PrimeIcons } from "primeng/api";
import { BasicUserInfo, FormDto, SubmissionDto, SubmissionExecutionBusinessFlowDto, SubmissionExecutionStatus, SubmissionExecutionTaskDto, SubmissionExecutionTaskStatus, SubmissionFieldModel } from "../../../core/schemas";
import { BusinessFlowService } from "../../../core/services/business-flow.service";
import { ToastService, UserStorageService } from "../../../core/services";
import { FormService } from "../../../core/services/form.service";

@Component({
    selector: 'app-space-record-business-flow',
    styleUrl: 'space-record-business-flow.component.scss',
    templateUrl: 'space-record-business-flow.component.html'
})
export class SpaceRecordBusinessFlowComponent implements OnInit, OnChanges {
    
    @Input()
    form!: FormDto;

    @Input()
    submission!: SubmissionDto;

    activeIndex: number = 0;

    executions?: SubmissionExecutionBusinessFlowDto[];

    tenantUsers: BasicUserInfo[] = [];

    businessFlowBlockForms: FormDto[] = [];

    businessFlowSubmissions: SubmissionDto[] = [];

    get items() : MenuItem[] {
        const inProgressExecution = this.executions?.find(x => x.status == SubmissionExecutionStatus.InProgress);
        if (!inProgressExecution)
            return [];

        return [
            {
                label: 'Chọn kết quả đầu ra',
                items: inProgressExecution.businessFlowBlock.outComes.map(x => {
                    return {
                        id: x.outCome.id,
                        label: x.outCome.name,
                        color: x.outCome.color,
                        toBlockName: x.toBlock?.name,
                    }
                })
            }
        ]
    }

    user(id: string) : BasicUserInfo | undefined {
        return this.tenantUsers.find(x => x.id == id);
    }

    constructor(
        private businessFlowService: BusinessFlowService,
        private toastService: ToastService,
        private userStorageService: UserStorageService,
        private formService: FormService
    ) { }

    ngOnInit(): void {
        this.userStorageService.currentUser.subscribe(x => {
            if (x)
                this.tenantUsers = x.tenantUsers;
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loadExecutions();
    }
    
    onSelectOutCome(outComeId: string) {
        this.businessFlowService.selectOutCome(this.submission.id, outComeId)
            .subscribe(x => {
                this.toastService.success('Chuyển bước nghiệp vụ thành công');
                this.loadExecutions();
            });
    }

    loadExecutions() {
        this.executions = undefined;
        if (this.submission) {
            this.businessFlowService.getSubmissionExecution(this.submission.id)
                .subscribe(x => {
                    this.executions = x;
                    this.activeIndex = this.executions.length - 1;
                    this.onTabChange(this.activeIndex);
                });
        }
    }

    toggleTaskStatus(execution: SubmissionExecutionBusinessFlowDto, task: SubmissionExecutionTaskDto) {
        if (execution.status == SubmissionExecutionStatus.Completed) 
            return;

        const status = task.status == SubmissionExecutionTaskStatus.Pending ? SubmissionExecutionTaskStatus.Done : SubmissionExecutionTaskStatus.Pending;
        this.businessFlowService.updateExecutionTaskStatus(execution.id, task.id, status)
            .subscribe(x => {
                task.status = status;
            });
    }

    completedTask(execution: SubmissionExecutionBusinessFlowDto) {
        return execution.tasks.filter(x => x.status == SubmissionExecutionTaskStatus.Done).length;
    }

    onTabChange(index: number) {
        if (!this.executions)
            return;

        const isHasForm = this.executions[index].businessFlowBlock.formId;
        if (!isHasForm)
            return;

        if (!this.businessFlowBlockForms[index]) {
            const businessFlowBlockId = this.executions[index].businessFlowBlock.id;
            this.formService.getBusinessFlowBlockForm(businessFlowBlockId)
                .subscribe(x => {
                    this.businessFlowBlockForms[index] = x;
                });
        }

        if (!this.businessFlowSubmissions[index]) {
            this.formService.getExecutionSubmission(this.executions[index].id)
                .subscribe(x => {
                    this.businessFlowSubmissions[index] = x;
                });
        }
    }

    onElementEditted(submission: SubmissionDto, field: SubmissionFieldModel) {
        this.formService.updateSubmissionField(submission.id, field)
            .subscribe(x => {

            }, error => {
                console.log(error);
            });
    }
}