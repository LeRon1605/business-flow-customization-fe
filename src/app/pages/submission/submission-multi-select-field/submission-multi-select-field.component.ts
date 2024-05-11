import { Component, Input } from "@angular/core";
import { BaseSubmissionFieldComponent } from "../base-submission-field.component";
import { FormElementDto } from "../../../core/schemas";

@Component({
    selector: 'app-submission-multi-select-field',
    styleUrl: 'submission-multi-select-field.component.scss',
    templateUrl: 'submission-multi-select-field.component.html'
})
export class SubmissionMultiSelectFieldComponent implements BaseSubmissionFieldComponent {
    
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

    value?: number[];
    loading = false;
    
}