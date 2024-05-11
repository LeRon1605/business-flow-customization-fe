import { Component, Input } from "@angular/core";
import { FormElementDto, FormElementOptionDto } from "../../../core/schemas";

@Component({
    selector: 'app-submission-single-select-field',
    styleUrl: 'submission-single-select-field.component.scss',
    templateUrl: 'submission-single-select-field.component.html'
})
export class SubmissionSingleSelectFieldComponent {

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

    value?: number;
    loading = false;
}