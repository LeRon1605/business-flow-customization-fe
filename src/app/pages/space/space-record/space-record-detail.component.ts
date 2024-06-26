import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { BasicUserInfo, FormDto, SpaceDetailDto, SubmissionDto, SubmissionFieldModel } from "../../../core/schemas";
import { FormService } from "../../../core/services/form.service";
import { MenuItem, PrimeIcons } from "primeng/api";
import { ToastService, UserStorageService } from "../../../core/services";
import { USERS } from "../../../core/constants";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
    selector: 'app-space-record-detail',
    styleUrl: 'space-record-detail.component.scss',
    templateUrl: 'space-record-detail.component.html'
})
export class SpaceRecordDetailComponent implements OnInit {
    
    @Input()
    spaceId!: number;

    @Input()
    space!: SpaceDetailDto;

    get editable() {
        return this.space.permissions.includes('Record.Edit');
    }

    @Input()
    submissionId!: number;

    @Input()
    form!: FormDto;

    @Output()
    submissionDeleted = new EventEmitter();

    submission!: SubmissionDto;

    items: MenuItem[] = [
        {
            label: 'Tùy chỉnh',
            items: [
                {
                    label: 'Xóa bản ghi',
                    icon: PrimeIcons.TRASH,
                    command: () => {
                        this.formService.deleteSubmitForm(this.submission.id)
                            .subscribe(x => {
                                this.toastService.success('Xóa bản ghi thành công');
                                this.submissionDeleted.emit();
                            })
                    }
                }
            ]
        }
    ];

    name: string = 'Bản ghi';
    tenantUsers: BasicUserInfo[] = [];

    constructor(
        private formService: FormService,
        private userStorageService: UserStorageService,
        private toastService: ToastService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.userStorageService.currentUser.subscribe(x => {
            if (x)
                this.tenantUsers = x.tenantUsers;
        });

        this.formService.getSubmissionById(this.spaceId, this.form.versionId, this.submissionId)
            .subscribe(x => {
                this.submission = x;
            }, (error: HttpErrorResponse) => {
                if (error.error.code === 'Submission:000003')
                    this.router.navigate(['error', 'not-found'])
            });
    }

    user(id: string) : BasicUserInfo | undefined {
        return this.tenantUsers.find(x => x.id == id);
    }

    createdBy() {
        return this.submission.createdBy == USERS.SYSTEM 
            ? this.submission.trackingEmail ?? 'Ẩn danh'
            : this.user(this.submission.createdBy)?.fullName ?? ''; 
    }

    onElementEditted(field: SubmissionFieldModel) {
        this.formService.updateSubmissionField(this.submission.id, field)
            .subscribe(x => {
                const index = this.submission.fields.findIndex(x => x.elementId == field.elementId);
                if (index >= 0)
                    this.submission.fields.splice(index, 1, field);
            });
    }

    onUpdateName() {
        if (!this.submission.name) {
            this.toastService.error('Không thể để trống tên bản ghi');
            return;
        }

        this.formService.updateSubmission(this.submission.id, this.submission.name)
            .subscribe(x => {

            }); 
    }
}