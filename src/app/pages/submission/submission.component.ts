import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from "@angular/core";
import { BaseSubmissionFieldComponent } from "./base-submission-field.component";
import { FormService } from "../../core/services/form.service";
import { FormDto, SubmissionDto, SubmissionModel } from "../../core/schemas";
import { ToastService } from "../../core/services";

@Component({
    selector: 'app-submission',
    templateUrl: 'submission.component.html'
})
export class SubmissionComponent implements OnInit, OnChanges {

    @Input()
    spaceId?: number;

    @Input()
    token?: string;

    @Input()
    submission?: SubmissionDto;

    @Input()
    trackingEmail?: string;

    @Input()
    editable: boolean = true;

    @Output()
    onSubmitted = new EventEmitter<number>();

    @ViewChildren('field')
    fields!: QueryList<BaseSubmissionFieldComponent>;

    form?: FormDto;
    name?: string;

    isValidToken: boolean = true;

    constructor(
        private formService: FormService,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        if (this.token != undefined) {
            this.formService.getPublicForm(this.token).subscribe(
                result => {
                  this.form = result;
                  this.name = result.name;
                },
                error => {
                  this.isValidToken = false;
                }
              );
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.token == undefined) {
            this.formService.getLatestVersion(changes['spaceId'].currentValue)
                .subscribe(x => {
                    this.form = x;
                    this.name = x.name;
                });
        }
    }

    getValue(id: number) {
        const field = this.submission?.fields.find(x => x.elementId == id);
        if (field)
            return field.value;

        return undefined;
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

        if (this.trackingEmail && this.token) {
            data.trackingEmail = this.trackingEmail;
        }

        if (this.spaceId != undefined) {
            this.formService.submitForm(this.spaceId, data)
                .subscribe(x => {
                    this.toastService.success('Gửi thành công');
                    this.onSubmitted.emit(x.id);
                });
        } else {
            this.formService.submitFormExternal(this.token!, data)
                .subscribe(x => {
                    this.toastService.success('Gửi thành công');
                    this.onSubmitted.emit(x.id);
                });
        }
    }
}