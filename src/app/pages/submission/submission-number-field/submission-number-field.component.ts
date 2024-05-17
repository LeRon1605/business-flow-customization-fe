import { Component, Input } from "@angular/core";
import { BaseSubmissionFieldComponent } from "../base-submission-field.component";
import { FormElementDto, FormElementSettingType } from "../../../core/schemas/form-element.schema";

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

    get isRequired() {
        return this.element.settings.some(x => x.type == FormElementSettingType.Required && JSON.parse(x.value) == true)
    }

    get isEmpty() {
        return this.value == undefined;
    }

    loading = false;
    value!: number;
}