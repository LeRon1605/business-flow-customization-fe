import { Component, Input } from "@angular/core";
import { BaseSubmissionFieldComponent } from "../base-submission-field.component";
import { FormElementDto } from "../../../core/schemas/form-element.schema";

@Component({
    selector: 'app-submission-number-field',
    styleUrl: 'submission-number-field.component.scss',
    templateUrl: 'submission-number-field.component.html'
})
export class SubmissionNumberFieldComponent implements BaseSubmissionFieldComponent {
    
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
    value!: number;
}