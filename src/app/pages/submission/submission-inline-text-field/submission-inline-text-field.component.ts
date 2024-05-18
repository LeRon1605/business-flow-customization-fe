import { Component, Input } from "@angular/core";
import { BaseSubmissionFieldComponent } from "../base-submission-field.component";
import { FormElementDto, FormElementSettingType } from "../../../core/schemas";

@Component({
    selector: 'app-submission-inline-text-field',
    templateUrl: 'submission-inline-text-field.component.html'
})
export class SubmissionInlineTextFieldComponent implements BaseSubmissionFieldComponent {
    
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

    get isRequired() {
        return this.element.settings.some(x => x.type == FormElementSettingType.Required && JSON.parse(x.value) == true)
    }

    get isEmpty() {
        return this.value == undefined || this.value === '';
    }

    value!: string;

}