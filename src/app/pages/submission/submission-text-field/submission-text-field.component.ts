import { Component, Input } from "@angular/core";
import { BaseSubmissionFieldComponent } from '../base-submission-field.component'
import { FormElementDto } from "../../../core/schemas";

@Component({
    selector: 'app-submission-text-field',
    templateUrl: 'submission-text-field.component.html'
})
export class SubmissionTextFieldComponent implements BaseSubmissionFieldComponent {
    
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

    value!: string;
    loading = false;
}