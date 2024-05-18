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
import { CalendarModule } from 'primeng/calendar';
import { SubmissionDateFieldComponent } from "./submission-date-field/submission-date-field.component";
import { SubmissionInlineComponent } from "./submission-inline.component";
import { SubmissionInlineTextFieldComponent } from "./submission-inline-text-field/submission-inline-text-field.component";
import { SubmissionInlineNumberFieldComponent } from "./submission-inline-number-field/submission-inline-number-field.component";
import { SubmissionInlineDateFieldComponent } from "./submission-inline-date-field/submission-inline-date-field.component";
import { SubmissionInlineSingleSelectFieldComponent } from "./submission-inline-single-select-field/submission-inline-single-select-field.component";
import { SubmissionInlineMultiSelectFieldComponent } from "./submission-inline-multi-select-field/submission-inline-multi-select-field.component";
import { TooltipModule } from 'primeng/tooltip';
import { SubmissionInlineAttachmentFieldComponent } from "./submission-inline-attachment-field/submission-inline-attachment-field.component";

@NgModule({
    declarations: [
        SubmissionTextFieldComponent,
        SubmissionNumberFieldComponent,
        SubmissionAttachmentFieldComponent,
        SubmissionSingleSelectFieldComponent,
        SubmissionMultiSelectFieldComponent,
        SubmissionDateFieldComponent,
        SubmissionComponent,
        SubmissionInlineTextFieldComponent,
        SubmissionInlineNumberFieldComponent,
        SubmissionInlineDateFieldComponent,
        SubmissionInlineSingleSelectFieldComponent,
        SubmissionInlineMultiSelectFieldComponent,
        SubmissionInlineAttachmentFieldComponent,
        SubmissionInlineComponent,
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
        MultiSelectModule,
        CalendarModule,
        TooltipModule
    ],
    exports: [
        SubmissionComponent,
        SubmissionInlineComponent
    ]
})
export class SubmissionModule { }