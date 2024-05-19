import { HttpResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UploadResponseDto } from "../../../shared/components/form-controls/file-uploader/file-uploader.component";
import { FileUploadEvent } from "primeng/fileupload";
import { FormElementDto, FormElementSettingType, SubmissionAttachmentFieldValueDto, SubmissionFieldModel } from "../../../core/schemas";
import { environment } from "../../../../environments/environment";
import { BaseSubmissionFieldComponent } from "../base-submission-field.component";

@Component({
    selector: 'app-submission-inline-attachment-field',
    styleUrl: 'submission-inline-attachment-field.component.scss',
    templateUrl: 'submission-inline-attachment-field.component.html'
})
export class SubmissionInlineAttachmentFieldComponent implements BaseSubmissionFieldComponent {

    @Output()
    elementEditted = new EventEmitter<SubmissionFieldModel>();
    
    @Input()
    element!: FormElementDto;

    @Input()
    styleCssClass?: string;

    @Input()
    loading!: boolean;

    @Input()
    get submissionValue() : string {
        return JSON.stringify(this.value);
    }

    set submissionValue(value: string | undefined) {
        if (value)
            this.value = JSON.parse(value);
    }

    uploadInProgress = false;
    value: SubmissionAttachmentFieldValueDto[] = [];
    uploadUrl = environment.baseUrl + '/hub/files';

    get isRequired() {
        return this.element.settings.some(x => x.type == FormElementSettingType.Required && JSON.parse(x.value) == true)
    }

    get isEmpty() {
        return this.value.length == 0;
    }

    onUpload(event: FileUploadEvent) {
        for(let file of event.files) {
            const fileUrl = <string>(<HttpResponse<UploadResponseDto>>event.originalEvent).body?.url;
            this.value.push({
                name: file.name,
                fileUrl: fileUrl
            });
        }

        this.elementEditted.emit({
            elementId: this.element.id,
            value: this.submissionValue
        });

        this.uploadInProgress = false;
    }

    onUploadError() {
        this.uploadInProgress = false;
    }

    onUploadProgress() {
        this.uploadInProgress = true;
    }

    onDeleteAttachment(file: SubmissionAttachmentFieldValueDto) {
        this.value.splice(this.value.indexOf(file), 1);
        this.elementEditted.emit({
            elementId: this.element.id,
            value: this.submissionValue
        });
    }
}