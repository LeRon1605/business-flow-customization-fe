import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from "@angular/core";
import { BaseSubmissionFieldComponent } from "./base-submission-field.component";
import { FormService } from "../../core/services/form.service";
import { FormDto, SubmissionModel } from "../../core/schemas";
import { ToastService } from "../../core/services";

@Component({
    selector: 'app-submission',
    templateUrl: 'submission.component.html'
})
export class SubmissionComponent implements OnInit, OnChanges {

    @Input()
    spaceId!: number;

    @Output()
    onSubmitted = new EventEmitter<number>();

    @ViewChildren('field')
    fields!: QueryList<BaseSubmissionFieldComponent>;

    form?: FormDto;
    name?: string;

    constructor(
        private formService: FormService,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.formService.getLatestVersion(changes['spaceId'].currentValue)
            .subscribe(x => {
                this.form = x;
                this.name = x.name;
            });
    }

    onSubmit() {
        for (const field of this.fields) {
            if (field.isRequired && field.isEmpty) {
                this.toastService.error(`${field.element.name} không được để trống`);
                return;
            }
        }

        if (!this.name || this.name == '') {
            this.toastService.error('Tên bản ghi không được để trống');
            return;
        }

        if (!this.form)
            return;

        const data : SubmissionModel = {
            name: <string>this.name,
            formVersionId: this.form.versionId,
            fields: this.fields.map(x => {
                return {
                    elementId: x.element.id,
                    value: x.submissionValue
                }
            })
        }

        this.formService.submitForm(this.spaceId, data)
            .subscribe(x => {
                this.toastService.success('Gửi thành công');
                this.onSubmitted.emit(x.id);
            });
    }
}