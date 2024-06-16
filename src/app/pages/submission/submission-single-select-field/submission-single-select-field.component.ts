import { Component, Input } from "@angular/core";
import { FormElementDto, FormElementSettingType } from "../../../core/schemas";
import { BaseSubmissionFieldComponent } from "../base-submission-field.component";
import { isArray } from "lodash";

@Component({
    selector: 'app-submission-single-select-field',
    styleUrl: 'submission-single-select-field.component.scss',
    templateUrl: 'submission-single-select-field.component.html'
})
export class SubmissionSingleSelectFieldComponent implements BaseSubmissionFieldComponent {

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
        if (value) {
            const optionIds = JSON.parse(value);
            if (isArray(optionIds)) {    
                this.value = optionIds[0];
            } else {
                this.value = parseInt(value);
            }
        }
    }

    get isRequired() {
        return this.element.settings.some(x => x.type == FormElementSettingType.Required && JSON.parse(x.value) == true)
    }

    get isEmpty() {
        return this.value == undefined;
    }

    value?: number;
    loading = false;
}