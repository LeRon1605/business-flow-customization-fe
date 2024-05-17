import { Component, Input } from "@angular/core";
import { FormElementDto, FormElementSettingType } from "../../../core/schemas";

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

    get isRequired() {
        return this.element.settings.some(x => x.type == FormElementSettingType.Required && JSON.parse(x.value) == true)
    }

    get isEmpty() {
        return this.value == undefined;
    }

    value?: number;
    loading = false;
}