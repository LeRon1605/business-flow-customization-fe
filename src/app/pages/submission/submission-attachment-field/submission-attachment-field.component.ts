import { Component, Input } from '@angular/core';
import { BaseSubmissionFieldComponent } from '../base-submission-field.component'
import { FileUploadEvent } from 'primeng/fileupload';
import { FormElementDto, FormElementSettingType } from '../../../core/schemas/form-element.schema';
import { environment } from '../../../../environments/environment';
import { UploadResponseDto } from '../../../shared/components/form-controls/file-uploader/file-uploader.component';
import { HttpResponse } from '@angular/common/http';
import { SubmissionAttachmentFieldValueDto } from '../../../core/schemas';

@Component({
    selector: 'app-submission-attachment-field',
    styleUrl: 'submission-attachment-field.component.scss',
    templateUrl: 'submission-attachment-field.component.html'
})
export class SubmissionAttachmentFieldComponent implements BaseSubmissionFieldComponent {
    
    @Input()
    element!: FormElementDto;

    @Input()
    styleCssClass?: string;

    @Input()
    get submissionValue() : string {
        return JSON.stringify(this.value);
    }

    set submissionValue(value: string) {
        this.value = JSON.parse(value);
    }

    loading = false;
    uploadInProgress = false;
    value: SubmissionAttachmentFieldValueDto[] = [];
    uploadUrl = environment.baseApiUrl + '/hub/files';

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

        this.uploadInProgress = false;
    }

    onUploadError() {
        this.uploadInProgress = false;
    }

    onUploadProgress() {
        this.uploadInProgress = true;
    }
}