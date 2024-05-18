import { Component, Input, OnInit } from "@angular/core";
import { FormDto, SubmissionDto } from "../../../core/schemas";
import { FormService } from "../../../core/services/form.service";
import { MenuItem, PrimeIcons } from "primeng/api";

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

    constructor(
        private formService: FormService
    ) { }

    ngOnInit(): void {
        this.formService.getSubmissionById(this.spaceId, this.form.versionId, this.submissionId)
            .subscribe(x => {
                this.submission = x;
            });
    }

}