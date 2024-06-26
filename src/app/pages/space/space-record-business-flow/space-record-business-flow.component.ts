import { AfterViewChecked, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { MenuItem, PrimeIcons } from "primeng/api";
import { BasicUserInfo, FormDto, NotificationType, SpaceDetailDto, SubmissionDto, SubmissionExecutionBusinessFlowDto, SubmissionExecutionStatus, SubmissionExecutionTaskDto, SubmissionExecutionTaskStatus, SubmissionFieldModel, UserInfo } from "../../../core/schemas";
import { BusinessFlowService } from "../../../core/services/business-flow.service";
import { ToastService, UserStorageService } from "../../../core/services";
import { FormService } from "../../../core/services/form.service";
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { Subscription, switchMap, tap } from "rxjs";
import { SignalrService } from "../../../core/services/realtime-client.service";

@Component({
    selector: 'app-space-record-business-flow',
    styleUrl: 'space-record-business-flow.component.scss',
    templateUrl: 'space-record-business-flow.component.html'
})
export class SpaceRecordBusinessFlowComponent implements OnInit, AfterViewChecked, OnDestroy {
    
    private _submission?: SubmissionDto;

    @Input()
    space!: SpaceDetailDto;

    @Input()
    get submission() {
        return this._submission;
    }

    set submission(value: SubmissionDto | undefined) {
        this._submission = value;
        if (this._submission) {
            this.loadExecutions();
        }
    }

    get editable() {
        return this.space.permissions.includes('Flow.Edit');
    }

    activeIndex: number = 0;

    executions?: SubmissionExecutionBusinessFlowDto[];

    tenantUsers: BasicUserInfo[] = [];

    businessFlowBlockForms: FormDto[] = [];

    businessFlowSubmissions: SubmissionDto[] = [];

    realTimeSubscription!: Subscription;

    handleRealTimeLater: boolean = false;

    latestExecutionId?: number;

    currentUser?: UserInfo;

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
        private formService: FormService,
        private cdref: ChangeDetectorRef,
        private realTimeService: SignalrService
    ) { }
    
    ngAfterViewChecked(): void {
        this.cdref.detectChanges();
    }

    ngOnInit(): void {
        this.userStorageService.currentUser.subscribe(x => {
            if (x) {
                this.currentUser = x;
                this.tenantUsers = x.tenantUsers;
            }
        });

        this.realTimeSubscription = this.realTimeService.realtime$.subscribe(x => {
            if (x.type != NotificationType.SubmissionExecutionInitiated)
                return;

            const data : { Id: string, ExecutionId: string } = JSON.parse(x.metaData);
            this.latestExecutionId = parseInt(data.ExecutionId);

            if (this.executions === undefined) {
                this.handleRealTimeLater = true;
                return;
            }

            this.loadLatestExecutionForm();
        });
    }

    ngOnDestroy(): void {
        this.realTimeSubscription.unsubscribe();
    }
    
    onSelectOutCome(outComeId: string) {
        this.businessFlowService.selectOutCome(this.submission!.id, outComeId)
            .subscribe(x => {
                this.loadExecutions(true);
                this.toastService.success('Chuyển bước nghiệp vụ thành công');
            });
    }

    loadExecutions(onSelectOutCome: boolean = false) {
        this.executions = undefined;
        this.businessFlowService.getSubmissionExecution(this.submission!.id)
            .subscribe(x => {
                this.executions = x;
                this.activeIndex = this.executions.length - 1;
                this.onTabChange(this.activeIndex, onSelectOutCome);
                if (this.handleRealTimeLater)
                    this.loadLatestExecutionForm();
            });
    }

    toggleTaskStatus(execution: SubmissionExecutionBusinessFlowDto, task: SubmissionExecutionTaskDto) {
        if (execution.status == SubmissionExecutionStatus.Completed || !this.editable) 
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

    onTabChange(index: number, onSelectOutCome: boolean = false) {
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

        if (!onSelectOutCome) {
            if (!this.businessFlowSubmissions[index]) {
                this.formService.getExecutionSubmission(this.executions[index].id)
                    .subscribe(x => {
                        this.businessFlowSubmissions[index] = x;
                    });
            }
        }
    }

    onElementEditted(submission: SubmissionDto, field: SubmissionFieldModel) {
        this.formService.updateSubmissionField(submission.id, field)
            .subscribe(x => {

            }, error => {
                console.log(error);
            });
    }

    loadLatestExecutionForm() {
        if (this.latestExecutionId === undefined || this.executions === undefined)
            return;

        const index = this.executions.findIndex(x => x.id == this.latestExecutionId);
        if (index >= 0) {
            this.formService.getExecutionSubmission(this.executions[index].id)
                .subscribe(x => {
                    this.businessFlowSubmissions[index] = x;
                });
        } 

        this.handleRealTimeLater = false;
        this.latestExecutionId = undefined;
    }
}