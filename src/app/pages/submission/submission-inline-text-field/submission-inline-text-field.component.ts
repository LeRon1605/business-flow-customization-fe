import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BaseSubmissionFieldComponent } from "../base-submission-field.component";
import { FormElementDto, FormElementSettingType, SubmissionFieldModel } from "../../../core/schemas";

@Component({
    selector: 'app-submission-inline-text-field',
    templateUrl: 'submission-inline-text-field.component.html'
})
export class SubmissionInlineTextFieldComponent implements BaseSubmissionFieldComponent {

    @Output()
    elementEditted = new EventEmitter<SubmissionFieldModel>();

    @Input()
    element!: FormElementDto;

    @Input()
    styleCssClass?: string;

    @Input()
    loading!: boolean;

    @Input()
    get submissionValue() : string {
        if (!this.value)
            return JSON.stringify('');
        
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

    onBlur() {
        this.elementEditted.emit({
            elementId: this.element.id,
            value: this.submissionValue
        });
    }

}