import { Component, Input, OnInit } from "@angular/core";
import { BasicUserInfo, FormDto, SubmissionDto, SubmissionFieldModel } from "../../../core/schemas";
import { FormService } from "../../../core/services/form.service";
import { MenuItem, PrimeIcons } from "primeng/api";
import { UserStorageService } from "../../../core/services";

@Component({
    selector: 'app-space-record-detail',
    templateUrl: 'space-record-detail.component.html'
})
export class SpaceRecordDetailComponent implements OnInit {

    @Input()
    spaceId!: number;

    @Input()
    submissionId!: number;

    @Input()
    form!: FormDto;

    @Input()
    submission!: SubmissionDto;

    items: MenuItem[] = [
        {
            label: 'Xóa bản ghi',
            icon: PrimeIcons.TRASH
        }
    ];

    name: string = 'Bản ghi';
    tenantUsers: BasicUserInfo[] = [];

    constructor(
        private formService: FormService,
        private userStorageService: UserStorageService
    ) { }

    ngOnInit(): void {
        this.userStorageService.currentUser.subscribe(x => {
            if (x)
                this.tenantUsers = x.tenantUsers;
        });

        this.formService.getSubmissionById(this.spaceId, this.form.versionId, this.submissionId)
            .subscribe(x => {
                this.submission = x;
            });
    }

    user(id: string) : BasicUserInfo | undefined {
        return this.tenantUsers.find(x => x.id == id);
    }

    onElementEditted(field: SubmissionFieldModel) {
        this.formService.updateSubmissionField(this.submission.id, field)
            .subscribe(x => {

            });
    }
}