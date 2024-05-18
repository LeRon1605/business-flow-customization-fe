import { Component, Input } from "@angular/core";
import { FormElementDto, FormElementSettingType } from "../../../core/schemas";
import { BaseSubmissionFieldComponent } from "../base-submission-field.component";

@Component({
    selector: 'app-submission-inline-single-select-field',
    styleUrl: 'submission-inline-single-select-field.component.scss',
    templateUrl: 'submission-inline-single-select-field.component.html'
})
export class SubmissionInlineSingleSelectFieldComponent implements BaseSubmissionFieldComponent {
    
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
        if (value) {
            const optionIds = JSON.parse(value);
            this.value = optionIds[0];
        }
    }

    get isRequired() {
        return this.element.settings.some(x => x.type == FormElementSettingType.Required && JSON.parse(x.value) == true)
    }

    get isEmpty() {
        return this.value == undefined;
    }

    value?: number;
    
}