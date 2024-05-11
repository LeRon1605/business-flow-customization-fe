import { NgModule } from "@angular/core";
import { SubmissionComponent } from "./submission.component";
import { InputNumberModule } from 'primeng/inputnumber';
import { SubmissionTextFieldComponent } from "./submission-text-field/submission-text-field.component";
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SubmissionNumberFieldComponent } from "./submission-number-field/submission-number-field.component";
import { ServeSyncCommonModule } from "../../shared/components/common/common.module";
import { FileUploadModule } from 'primeng/fileupload';
import { SubmissionAttachmentFieldComponent } from "./submission-attachment-field/submission-attachment-field.component";
import { DropdownModule } from 'primeng/dropdown';
import { SubmissionSingleSelectFieldComponent } from "./submission-single-select-field/submission-single-select-field.component";
import { MultiSelectModule } from 'primeng/multiselect';
import { SubmissionMultiSelectFieldComponent } from "./submission-multi-select-field/submission-multi-select-field.component";

@NgModule({
    declarations: [
        SubmissionTextFieldComponent,
        SubmissionNumberFieldComponent,
        SubmissionAttachmentFieldComponent,
        SubmissionSingleSelectFieldComponent,
        SubmissionMultiSelectFieldComponent,
        SubmissionComponent
    ],
    imports: [
        InputTextModule,
        SkeletonModule,
        CommonModule,
        FormsModule,
        InputNumberModule,
        ServeSyncCommonModule,
        FileUploadModule,
        DropdownModule,
        MultiSelectModule
    ],
    exports: [
        SubmissionComponent
    ]
})
export class SubmissionModule { }