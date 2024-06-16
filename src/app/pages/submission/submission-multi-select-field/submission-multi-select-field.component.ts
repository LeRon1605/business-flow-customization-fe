import { Component, Input } from "@angular/core";
import { BaseSubmissionFieldComponent } from "../base-submission-field.component";
import { FormElementDto, FormElementSettingType } from "../../../core/schemas";

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
    editable: boolean = true;

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
        return this.value == undefined || this.value.length == 0;
    }

    value?: number[];
    loading = false;
    
}